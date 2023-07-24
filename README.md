# Code Review Private AI

Forked from <https://github.com/mattzcarey/code-review-gpt> but removed OpenAI GPT dependencies.

## Template CI Usage (GitHub Actions)

```yml
- name: Install code-review-private-ai
   run: npm install code-review-private-ai

- name: Run code review script
   run: npx code-review-private-ai review --ci
   env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      BASE_SHA: ${{ github.event.pull_request.base.sha }}
      GITHUB_SHA: ${{ github.sha }}
```

See templates/pr.yml for an example.
