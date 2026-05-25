#!/bin/bash
# PostToolUse 훅: 주요 파일 변경 시 CLAUDE.md 업데이트 상기

INPUT=$(cat)
FILE=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    path = d.get('tool_input', {}).get('file_path', '')
    print(path)
except:
    print('')
" 2>/dev/null)

if echo "$FILE" | grep -qE "(package\.json|tsconfig\.json|src/apis/|src/store/|src/components/|src/constants/)"; then
  echo "📝 CLAUDE.md 업데이트 확인: '$FILE' 이 변경되었습니다. 스택/구조/기능이 바뀐 경우 CLAUDE.md도 함께 업데이트해주세요."
fi
