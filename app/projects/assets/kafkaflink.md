---
title: Adaptive Learning Platform - Real-Time Stream Processing
startedAt: 2026-03-28T00:00:00
finishedAt: 
summary: The system is meant to support an Online Adaptive Learning Platform, with the real-time processing of user data, the recommendation algorithm is able to provide the most suitable assessment suite based on user's latest feature. 
github: https://github.com/xxueewa/flinkstreamprocesssvc
---
**Topics: Apache Flink, Spring Boot, Confluent Kafka, AWS, NoSQL, Data Warehouse, Recommendation Algorithm**
## High-Level-Design Diagram
![architecture](https://res.cloudinary.com/de3ww4ssm/image/upload/v1780442722/High-Level-Design_q6xgcg.jpg)
## Engineering Challenges
### End-to-End Latency Optimization
Imagine the scenario when user submit the assessment and immediately request for a new one, the system is expected to provide the inference result based on the alreay updated user features, therefore, the end-to-end latency of feature extraction workflow is crucial. 

In the design, I broke down the entire flow into four stages. 

- Stage 1: The producing of user.feature.result, takes around 60ms.
- Stage 2: The flink data stream processing, including the feature extraction and imdempotent producing of user.assessment.feature events, takes up to 80ms. 
- Stage 3: The consumption of intermediate topic and sink of online feature takes about 30ms. 
- Stage 4: Once the user request for a new assessment, the online inference takes about 50ms.

Overall, the end-to-end latency is about 220ms, which is acceptable.

### Split-Brain Problem 
In this system, the data will be store in both online and offline feature stores, where online store serves the inference, and offline features will be used in the model training and iteration. However, the data stored in these two storages could be different, and might cause the split-brain problem. 

In computing, split-brain is a state indicating data or availability inconsistencies originating from the maintenance of two separate data sets with overlap in scope, either because of servers in a network design, or a failure condition based on servers not communicating and synchronizing their data to each other. (Wikipedia)
