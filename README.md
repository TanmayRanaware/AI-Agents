# 1. Advanced Agent: Developer Code Reserach Tools Agent

The **Advanced Agent** is an intelligent research assistant designed to help developers discover, compare, and analyze developer tools and technologies. Powered by LLMs and web scraping, it automates the process of gathering information about software tools, their features, pricing, tech stack, and more.

## Features

- 🔍 **Automated Research:** Finds and analyzes articles, websites, and documentation about developer tools.
- 🏢 **Company & Tool Analysis:** Extracts structured information such as pricing models, open source status, tech stack, API availability, language support, and integrations.
- 🤖 **LLM-Powered Recommendations:** Uses advanced language models to provide concise, actionable recommendations for developers.
- 🌐 **Web Scraping:** Integrates with Firecrawl to fetch and process web content for deeper insights.
- 🛠️ **Extensible Workflow:** Modular design allows easy customization and extension for new research tasks.

## How It Works

1. **Query Input:** Enter a developer tools query (e.g., "best vector database alternatives").
2. **Automated Search & Extraction:** The agent searches for relevant articles and websites, extracts tool names, and gathers detailed information.
3. **Analysis:** Uses LLMs to analyze and summarize key features, pricing, and technical details.
4. **Recommendations:** Presents concise recommendations and comparisons to help you choose the right tool.

## Usage

1. Clone this repository.
2. Install dependencies (Python 3.11+ recommended).
3. Set up your `.env` file with required API keys (see `.env.example`).
4. Run the agent:
   ```sh
   python main.py
   ```
5. Enter your developer tools query and get instant research and recommendations.

## Project Structure

- `main.py` — Command-line interface for the agent.
- `src/` — Core modules for workflow, scraping, prompts, and data models.
- `.env.example` — Example environment configuration.

## Requirements

- Python 3.11+
- [Firecrawl API key](https://firecrawl.dev/)
- [OpenAI API key](https://platform.openai.com/)

## Disclaimer

**Do not commit your API keys or secrets to version control.**  
Add your `.env` file to `.gitignore` to keep your credentials safe.

---

**Advanced Agent** accelerates developer research, saving you hours of manual comparison and analysis.  
Feel free to contribute or open issues
