---
title: BizTrip Assistant - LLM-Based Artificial Intelligence Application
startedAt: 2026-03-10T00:00:00
finishedAt: 
summary: During the tight schedule of business travel, user probably moves between the airport, train station, and subway station. It is not convenient for them to type the questions and read the answer, providing the STS interaction ease the difficulties of interacting with AI assistant, and get the task done efficiently. 
---

Topics: MultiModal, LLM, LangGraph, WebSocket, STS, RAG 

## Version 1.0 Intro
- Audio & Text Interaction on Mobile App
- Intention Detection and Self-Reasoning
- Accumulated Domain Knowledge
- Admin Console
- System Tracing and Performance Monitor

### Agent Performance
- Tool Calling:
    1. Code evaluator: **88%** tool selection accuracy
    2. LLM-as-a-Judge: **100%** tool usage accuracy 
- Correctness:
    1. LLM-as-a-Judge: **80%** correctness
- Latency:
    1. P50: ~10s latency on average

![experiment01](https://res.cloudinary.com/de3ww4ssm/image/upload/v1779763464/experiment_zll1lj.png)
[Code Evaluator]

![experiment02](https://res.cloudinary.com/de3ww4ssm/image/upload/v1779780309/tool_selection_llm_fndkt5.png)
[LLM as a Judge]

### RAG Service
Retrieval-Augmented-Generation (RAG) is a classic technology to enable the domain knowldge of AI as need. The service allows user to upload and manage their own domain knowledge, make the assistant understand, listen, and execute, based on user's perference. 

The retrieval strategies include:
- semantic search
- vector-based retrieval
- hybrid-search

### STS Service
The Speech-To-Speech design provides continuous audio interactions in one user session, and is complemented by text input and summay, aiming to seamless user experience in tight, high pressure scenario. 

### Multi-Agent Service
Built on OpenAI’s LLM foundation, the agent graph extends reasoning with search, retrieval, and offline feedback workflows.
The multi-agent system enables end-to-end task execution with continuous learning and refinement.
Designed as a self-improving assistant, it evolves through interaction while maintaining reliable and trustworthy behavior.

### Distributed Observation 
The LangSmith platform captures detailed traces and performance metrics, offering clear visibility into agent behavior and task execution.
Its observability capabilities simplify evaluation, debugging, and optimization while supporting effective budget and token usage control.
