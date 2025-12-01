#!/bin/bash
cd /home/kavia/workspace/code-generation/typing-test-47973-48086/TypingTestMonolithicApp
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

