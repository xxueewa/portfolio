---
title: BizTrip Assistant - LLM-Based Artificial Intelligence Application
startedAt: 2026-03-10T00:00:00
finishedAt: 
summary: During the tight schedule of business travel, users probably move between the airport, train station, and subway station. It is not convenient for them to type the questions and read the answer, providing the STS interaction eases the difficulties of interacting with AI assistant, and get the task done efficiently. 
github: https://github.com/xxueewa/aiassistantwithtracing
---
**Topics: MultiModal-Model, Large-Language-Model, LangGraph, WebSocket, Speech-To-Speech, Retrieval-Augmented-Generation**
**Additional Topics: Event-Driven-Architecture, Cross-Encoder Reranker, Performance Optimization**
## Version 1.0 Intro
- Audio & Text Interaction on Mobile App
- Intention Detection and Self-Reasoning
- Accumulated Domain Knowledge
- Admin Console
- System Tracing and Performance Monitor

### Agent Performance
- Tool Calling:
    1. Code evaluator: **88%** tool selection accuracy
    2. LLM-as-a-Judge: evaluate the tool usage reasoning result
- Correctness:
    1. LLM-as-a-Judge: **80%** correctness
- Latency:
    1. P50: ~10s latency on average

![experiment01](https://res.cloudinary.com/de3ww4ssm/image/upload/v1779763464/experiment_zll1lj.png)
[Code Evaluator]

![experiment02](https://res.cloudinary.com/de3ww4ssm/image/upload/v1779780309/tool_selection_llm_fndkt5.png)
[LLM as a Judge]

### RAG Service
Retrieval-Augmented-Generation (RAG) is a classic technology to enable the domain knowledge of AI as needed. The service allows users to store and manage their own domain knowledge, make the assistant understand, listen, and execute, based on company's domain knowledge set. 

The retrieval strategies include:
- semantic search
- vector-based retrieval
- hybrid-search

### STS Service
The Speech-To-Speech design provides continuous audio interactions in one user session, and is complemented by text input and summary, aiming for a seamless user experience in tight, high pressure scenarios. 

### Multi-Agent Service
Built on OpenAI’s LLM foundation, the agent graph extends reasoning with search, retrieval, and offline feedback workflows.
The multi-agent system enables end-to-end task execution with continuous learning and refinement.
Designed as a self-improving assistant, it evolves through interaction while maintaining reliable and trustworthy behavior.

### Distributed Observation 
The LangSmith platform captures detailed traces and performance metrics, offering clear visibility into agent behavior and task execution.
Its observability capabilities simplify evaluation, debugging, and optimization while supporting effective budget and token usage control.
