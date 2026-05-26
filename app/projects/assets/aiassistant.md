---
title: BizTrip Assistant
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

The current assistant achieved roughly:
- 88% tool calling accuracy (LangGraph Experiment Results)
- over 90% intention detection correctness (human evaluation)
- less than 10s latency on average, plus streaming responses

![experiment](https://res.cloudinary.com/de3ww4ssm/image/upload/v1779763464/experiment_zll1lj.png)


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
