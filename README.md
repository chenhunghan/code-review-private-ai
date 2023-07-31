# Code Review Private AI

Forked from <https://github.com/mattzcarey/code-review-gpt> but removed OpenAI GPT dependencies.

## CI Usage (GitHub Actions)

Use Llama 2 7B Chat, needs ~8GB RAM

```yml
- name: Install code-review-private-ai
   run: npm install code-review-private-ai

- name: Run code review script
   run: npx code-review-private-ai review --model="llama-2-7b-chat.ggmlv3.q4_0.bin" --temperature="0.1" --basePath="http://localhost:8000/v1"
   env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      BASE_SHA: ${{ github.event.pull_request.base.sha }}
      GITHUB_SHA: ${{ github.sha }}
```

Use Llama 2 70B Chat, needs about 40GB RAM

```yml
- name: Install code-review-private-ai
   run: npm install code-review-private-ai

- name: Run code review script
   run: npx code-review-private-ai review --model="llama-2-70b.ggmlv3.q4_0.bin" --temperature="0.1" --basePath="http://localhost:8000/v1"
   env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      BASE_SHA: ${{ github.event.pull_request.base.sha }}
      GITHUB_SHA: ${{ github.sha }}
```

See templates/pr.yml for an example.
