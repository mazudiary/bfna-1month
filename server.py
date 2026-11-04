import os
import re
import sys
from functools import partial
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

class RangeRequestHandler(SimpleHTTPRequestHandler):
    """
    HTTP Request Handler with full HTTP 206 Partial Content (Range requests) support.
    Enables progressive video streaming and instant frame-by-frame scrubbing across all browsers.
    """
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def send_head(self):
        if 'Range' not in self.headers:
            return super().send_head()

        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().send_head()

        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        total = fs.st_size
        range_header = self.headers['Range'].strip()
        match = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not match:
            f.close()
            return super().send_head()

        first = int(match.group(1))
        last = int(match.group(2)) if match.group(2) else total - 1
        if first >= total:
            f.close()
            self.send_error(416, "Requested Range Not Satisfiable")
            return None

        last = min(last, total - 1)
        length = last - first + 1

        self.send_response(206)
        ctype = self.guess_type(path)
        self.send_header("Content-type", ctype)
        self.send_header("Content-Range", f"bytes {first}-{last}/{total}")
        self.send_header("Content-Length", str(length))
        self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
        self.send_header("Cache-Control", "public, max-age=3600")
        self.end_headers()

        f.seek(first)
        return RangeFileWrapper(f, length)

class RangeFileWrapper:
    def __init__(self, file_obj, length):
        self.file_obj = file_obj
        self.remaining = length

    def read(self, size=-1):
        if self.remaining <= 0:
            return b""
        if size < 0 or size > self.remaining:
            size = self.remaining
        data = self.file_obj.read(size)
        if not data:
            return b""
        self.remaining -= len(data)
        return data

    def close(self):
        self.file_obj.close()

def run(port=3000):
    handler = partial(RangeRequestHandler, directory=ROOT_DIR)
    server_address = ('', port)
    httpd = HTTPServer(server_address, handler)
    print(f"Serving HTTP with Range Support on http://localhost:{port}/ from {ROOT_DIR} ...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
    run(port)
