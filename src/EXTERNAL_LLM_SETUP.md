# External LLM Integration Guide for AfriBenki AI Advisor

## Overview

AfriBenki's AI Advisor can be connected to external Large Language Model (LLM) APIs to provide intelligent, context-aware financial advice to users. This guide explains how to configure and integrate external LLM services.

## Supported LLM Providers

The AI Advisor supports any LLM API that follows the OpenAI-compatible message format, including:

- **OpenAI** (GPT-4, GPT-3.5-turbo)
- **Anthropic Claude** (via OpenAI-compatible wrapper)
- **Google Gemini** (via OpenAI-compatible wrapper)
- **Mistral AI**
- **OpenRouter** (aggregator for multiple models)
- **Local LLMs** (via LM Studio, Ollama, etc.)

## Configuration

### Step 1: Set Environment Variables

In your Supabase project, navigate to **Settings > Edge Functions > Secrets** and add the following environment variables:

```bash
EXTERNAL_LLM_API_URL=<your-llm-api-endpoint>
EXTERNAL_LLM_API_KEY=<your-api-key>
```

### Step 2: Provider-Specific Setup

#### OpenAI Configuration

```bash
EXTERNAL_LLM_API_URL=https://api.openai.com/v1/chat/completions
EXTERNAL_LLM_API_KEY=sk-your-openai-api-key
```

**Recommended Model:** `gpt-3.5-turbo` for cost-effectiveness or `gpt-4` for higher quality

#### Anthropic Claude Configuration

```bash
EXTERNAL_LLM_API_URL=https://api.anthropic.com/v1/messages
EXTERNAL_LLM_API_KEY=sk-ant-your-anthropic-api-key
```

**Note:** You may need a wrapper service to convert Anthropic's API to OpenAI format.

#### OpenRouter Configuration

OpenRouter provides access to multiple LLM providers through a single API:

```bash
EXTERNAL_LLM_API_URL=https://openrouter.ai/api/v1/chat/completions
EXTERNAL_LLM_API_KEY=sk-or-your-openrouter-api-key
```

**Recommended Models:**
- `anthropic/claude-3-haiku` (fast, affordable)
- `mistralai/mistral-7b-instruct` (open-source, good quality)
- `openai/gpt-3.5-turbo` (balanced)

#### Local LLM (LM Studio/Ollama)

For local development or privacy-focused deployments:

```bash
EXTERNAL_LLM_API_URL=http://localhost:1234/v1/chat/completions
EXTERNAL_LLM_API_KEY=not-needed
```

**Recommended Models:**
- Llama 2 7B/13B
- Mistral 7B
- Phi-2

## API Request Format

The server sends requests in this format:

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful financial advisor for AfriBenki, a fintech app. User context: {user_data}. Provide personalized, actionable financial advice in a friendly tone. Keep responses concise but informative."
    },
    {
      "role": "user",
      "content": "User's question here"
    }
  ],
  "max_tokens": 500,
  "temperature": 0.7
}
```

## User Context Provided to LLM

The AI Advisor sends the following user context to help personalize responses:

```json
{
  "userId": "user-id",
  "name": "User Name",
  "balance": 125000,
  "portfolioValue": 485000,
  "savings": 200000,
  "currency": "NGN",
  "language": "en",
  "currentScreen": "home",
  "recentActivities": [...]
}
```

## Testing Your Integration

### 1. Using the Supabase Secret Manager

Add your API credentials using the `create_supabase_secret` tool:

```typescript
// The system will prompt you to add:
// - EXTERNAL_LLM_API_URL
// - EXTERNAL_LLM_API_KEY
```

### 2. Test the Connection

Open the AfriBenki app and ask the AI Advisor a question like:

```
"What should I invest in?"
```

The response will include a `source` field:
- `external_llm` - Successfully connected to external LLM
- `builtin` - Using built-in responses (LLM not configured)
- `error` - Connection failed

### 3. Check Server Logs

Monitor the Edge Function logs in Supabase Dashboard:

```bash
# Look for these log entries:
"External LLM error: ..." (if there's an issue)
"AI chat error: ..." (for general errors)
```

## Cost Optimization

### Token Usage

The AI Advisor is configured to use a maximum of **500 tokens** per response to control costs.

**Estimated costs (per 1000 user queries):**

| Provider | Model | Cost |
|----------|-------|------|
| OpenAI | GPT-3.5-turbo | ~$1.50 |
| OpenAI | GPT-4 | ~$30.00 |
| OpenRouter | Claude 3 Haiku | ~$0.75 |
| OpenRouter | Mistral 7B | ~$0.20 |
| Local LLM | Any | $0.00 |

### Optimization Tips

1. **Use faster models** for general queries (GPT-3.5, Claude Haiku)
2. **Implement caching** for common questions
3. **Set usage limits** per user
4. **Monitor token usage** in your provider dashboard

## Fallback Behavior

If the external LLM is unavailable or not configured, the AI Advisor falls back to:

1. **Built-in rule-based responses** - Handles common queries about navigation, features, and basic financial advice
2. **Contextual suggestions** - Provides relevant next actions based on user state

## Security Best Practices

1. **Never expose API keys** in client-side code
2. **Rotate API keys** regularly
3. **Set rate limits** on your LLM provider account
4. **Monitor usage** for unusual patterns
5. **Use environment-specific keys** (dev, staging, production)

## Troubleshooting

### Issue: "External LLM is not configured"

**Solution:** Ensure both `EXTERNAL_LLM_API_URL` and `EXTERNAL_LLM_API_KEY` are set in Supabase Edge Function secrets.

### Issue: "External LLM API error: 401 Unauthorized"

**Solution:** Check that your API key is correct and has not expired.

### Issue: "External LLM API error: 429 Rate Limit"

**Solution:** You've exceeded your provider's rate limit. Wait or upgrade your plan.

### Issue: Slow responses

**Solution:** 
- Use a faster model (e.g., GPT-3.5 instead of GPT-4)
- Reduce `max_tokens` in the server code
- Consider caching common responses

## Advanced Configuration

### Custom System Prompts

Modify the system prompt in `/supabase/functions/server/index.tsx`:

```typescript
content: `You are a helpful financial advisor for AfriBenki...
         ${customInstructions}
         User context: ${JSON.stringify(context)}.`
```

### Multi-language Support

The AI Advisor automatically detects user language and can respond accordingly:

```typescript
content: `You are a helpful financial advisor for AfriBenki.
         Respond in ${context.language === 'fr' ? 'French' : 'English'}.
         User context: ${JSON.stringify(context)}.`
```

### Fine-tuning for African Markets

Consider fine-tuning your LLM with African financial market data for better responses:

1. Collect African investment data
2. Fine-tune on OpenAI or other providers
3. Use the fine-tuned model ID in your configuration

## Example Implementations

### OpenAI with Streaming (Advanced)

```typescript
const response = await fetch(externalLLMUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${externalLLMKey}`,
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [...],
    max_tokens: 500,
    temperature: 0.7,
    stream: true,  // Enable streaming
  }),
});
```

### Custom Error Handling

```typescript
try {
  const response = await fetch(externalLLMUrl, {...});
  
  if (!response.ok) {
    // Log error for monitoring
    await kv.set(`llm-error:${Date.now()}`, {
      status: response.status,
      message: await response.text(),
      timestamp: new Date().toISOString(),
    });
    
    throw new Error(`LLM API error: ${response.statusText}`);
  }
} catch (error) {
  // Fallback to built-in responses
  return generateBuiltinResponse(message, context);
}
```

## Support

For issues or questions:
1. Check Supabase Edge Function logs
2. Review this documentation
3. Test with a known-working provider (e.g., OpenAI)
4. Contact your LLM provider's support

## License & Attribution

When using external LLM services, ensure you comply with:
- Your LLM provider's terms of service
- Data privacy regulations (GDPR, CCPA, etc.)
- Attribution requirements (if any)

---

**Last Updated:** January 2025  
**Version:** 1.0.0
