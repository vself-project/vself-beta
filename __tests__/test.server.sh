#!/bin/bash
set -e

# Views
#curl http://localhost:8080/api/trpc/upload_evidence && echo ""
curl "http://localhost:3000/api/trpc/upload-evidence?data=x" && echo ""

