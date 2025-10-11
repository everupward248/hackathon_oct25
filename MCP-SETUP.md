# MCP Server Configuration

## Configured MCP Servers

This document tracks all Model Context Protocol (MCP) servers configured for the Cayman Islands Career Mapping hackathon project.

---

## 1. GitHub MCP ✅

**Status**: Connected
**Type**: HTTP
**Purpose**: Version control, repository management, issues, pull requests

**Configuration**:
```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp \
  -H "Authorization: Bearer github_pat_..."
```

**Use Cases**:
- Create and manage GitHub repository
- Create issues for bug tracking
- Manage pull requests
- CI/CD integration

---

## 2. Supabase MCP ❌ REMOVED

**Status**: Removed (not needed for this project)
**Reason**: Using Flask + PostgreSQL backend instead of Supabase

**To Remove**:
```bash
claude mcp remove supabase
```

**Alternative**: Backend team handles database via Flask API

---

## 3. Playwright MCP ✅

**Status**: Connected
**Type**: stdio
**Purpose**: Browser automation, UI testing, screenshots, visual verification

**Configuration**:
```bash
claude mcp add playwright npx @playwright/mcp@latest
```

**Use Cases**:
- **Self-reflection on UI**: Take screenshots during development
- Test lifestyle assessment flow
- Verify career matching results display
- Test mobile responsiveness
- Capture visual bugs
- Generate demo screenshots
- Automated user flow testing

**Important**: First time usage, explicitly say "playwright mcp" to ensure it uses the MCP server

---

## 4. REF MCP ⚠️

**Status**: Needs fixing
**Type**: HTTP
**Purpose**: Token-efficient API documentation search

**Configuration**:
```bash
claude mcp add --transport http ref \
  "https://api.ref.tools/mcp?apiKey=ref-4002fd93bfeabd6282b8"
```

**Use Cases**:
- Quick Next.js API documentation lookup
- React Hook Form reference
- Recharts examples
- TypeScript patterns
- Reduces context window usage

**Troubleshooting Steps to Fix**:

1. **Check if REF MCP is already added**:
   ```bash
   claude mcp list
   ```

2. **If it exists but not working, remove and re-add with new API key**:
   ```bash
   claude mcp remove ref
   claude mcp add --transport http ref \
     "https://api.ref.tools/mcp?apiKey=ref-4002fd93bfeabd6282b8"
   ```

3. **Restart Claude Code**:
   - Quit Claude Code completely
   - Reopen and check `claude mcp list` again

4. **Verify API key is active**:
   - Visit https://ref.tools/dashboard
   - Check API key status

5. **Alternative if still not working**:
   - Can use web search or read Next.js docs directly
   - Not critical for development

---

## Verification

Run `claude mcp list` to check server status:

```bash
claude mcp list
```

**Expected Output**:
- github: ✓ Connected
- playwright: ✓ Connected
- ref: ⚠ Needs fixing (follow troubleshooting steps above)

**Note**: Supabase MCP has been removed as it's not needed for this project.

---

## Why These MCP Servers?

### Critical for Hackathon Success:

1. **GitHub MCP**: Essential for version control and deployment
2. **Playwright MCP**: Visual feedback loop for UI development
3. **REF MCP**: Fast documentation lookup without context bloat (optional but helpful)

### Removed/Skipped (Not Needed):

- ❌ **Supabase MCP**: Using Flask + PostgreSQL backend instead
- ❌ **Perplexity MCP**: Can use web search instead
- ❌ **Linear MCP**: Simple todo tracking is sufficient
- ❌ **Semgrep**: Nice-to-have but not critical for 3-day sprint
- ❌ **Figma MCP**: No design files for this project
- ❌ **Code Rabbit**: Overkill for hackathon timeline

---

## Development Workflow with MCPs

### Example: Building Assessment Form

1. **Research** (REF MCP):
   ```
   Query: "React Hook Form multi-step form patterns"
   → Get API documentation
   ```

2. **Implement**:
   ```typescript
   // Build the component using patterns from docs
   ```

3. **Visual Verify** (Playwright MCP):
   ```
   "Use playwright mcp to navigate to localhost:3000/assessment and take a screenshot"
   → See actual UI
   → Identify issues
   ```

4. **Iterate & Fix**:
   ```
   Fix styling issues → Screenshot again → Verify
   ```

5. **Commit** (GitHub MCP):
   ```
   Create commit → Push to repository
   ```

6. **Backend API Integration**:
   ```
   Frontend calls Flask REST API → Backend handles PostgreSQL
   ```

---

## Configuration File Location

All MCP servers are configured in:
```
/Users/Kevin/.claude.json
```

**Project-specific configuration** is stored in the `mcpServers` section.

---

## Next Steps

1. ✅ GitHub MCP configured and working
2. ✅ Playwright MCP configured and working
3. ✅ Supabase MCP removed (not needed)
4. ⏭️ Fix REF MCP connection (follow troubleshooting steps above)
5. ✅ Frontend project structure created
6. ⏭️ Install npm dependencies and start building features

---

*Last Updated: 2025-10-11*
*Project: Cayman Islands Lifestyle-Career Mapping Platform*
