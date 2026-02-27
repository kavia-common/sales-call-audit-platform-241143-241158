#!/bin/bash
cd /home/kavia/workspace/code-generation/sales-call-audit-platform-241143-241158/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

