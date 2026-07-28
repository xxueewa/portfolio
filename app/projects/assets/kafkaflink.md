---
title: Adaptive Learning Platform With Personalized Recommendation
startedAt: 2026-03-28T00:00:00
finishedAt: 
summary: The system is meant to support an Online Adaptive Learning Platform, with the real-time processing of user data, the recommendation algorithm is able to provide the most suitable assessment suite based on user's latest feature. 
github: https://github.com/xxueewa/flinkstreamprocesssvc
---
**Topics: Apache Flink, Spring Boot, Confluent Kafka, AWS, NoSQL, Feature Store, Feature Engineering, Bayesian Knowledge Tracing, Neural Networks**
## High-Level-Design Diagram
![architecture](https://res.cloudinary.com/de3ww4ssm/image/upload/v1780442722/High-Level-Design_q6xgcg.jpg)

## Design Challenges
### Dynamic Feature Update
Bayesian Knowledge Tracing is known as a common algorithm to dynamically update user's mastery level of each skill. In this system, it was designed to calculate user's skill on each tag group of questions. The backbone of BKT is hidden markov chain, while processing a sequence of questions-result pairs, it is able to updating the probability of correctness. 

$$P(L_t \mid \text{Correct}) = \frac{P(L_{t-1}) \cdot (1 - P(S))}{P(L_{t-1}) \cdot (1 - P(S)) + (1 - P(L_{t-1})) \cdot P(G)}$$

$$P(L_t \mid \text{Incorrect}) = \frac{P(L_{t-1}) \cdot  P(S)}{P(L_{t-1}) \cdot P(S) + (1 - P(L_{t-1})) \cdot (1-P(G))}$$

$$P(Next Correct) = P(L_{t}) \cdot  (1- P(S)) + (1-P(L_{t})) \cdot P(G)$$

### Algorithm Analysis and Selection
Typical recommendation approaches fall into two categories: Collaborative Filtering, which leverages patterns across users with similar behavior, and Content-Based Filtering, which matches items to a user's explicit feature profile. 

While tree-based models such as XGBoost are expressive and handle rich feature interactions well, they are computationally prohibitive at serving time — ranking every candidate assessment in a large corpus against a user's feature vector is not feasible under latency constraints. Embedding-based models address this by projecting both users and items into a shared low-dimensional vector space, enabling retrieval via Approximate Nearest Neighbor (ANN) search rather than exhaustive scoring. 

This system adopts a **Two-Tower Network** architecture, a hybrid approach that encodes user features and item features through separate neural towers and produces dense embeddings for each. At serving time, the user embedding is computed once and ANN search retrieves the top-k candidate assessments efficiently — combining the feature richness of content-based models with the scalability of embedding retrieval.

## Engineering Challenges
### End-to-End Latency Optimization
Imagine the scenario when user submit the assessment and immediately request for a new one, the system is expected to provide the inference result based on the alreay updated user features, therefore, the end-to-end latency of feature extraction workflow is crucial. 

In the design, I broke down the entire flow into four stages. 

- Stage 1: The producing of user.feature.result, takes around 60ms.
- Stage 2: The flink data stream processing, including the feature extraction and idempotent producing of user.assessment.feature events, takes up to 80ms. 
- Stage 3: The consumption of intermediate topic and sink of online feature takes about 30ms. 
- Stage 4: Once the user request for a new assessment, the online inference takes about 50ms.

Overall, the end-to-end latency is about 220ms, which is acceptable.

### Split-Brain Problem 
In this system, the data will be store in both online and offline feature stores, where online store serves the inference, and offline features will be used in the model training and iteration. However, the data stored in these two storages could be different, and might cause the split-brain problem. 

In computing, split-brain is a state indicating data or availability inconsistencies originating from the maintenance of two separate data sets with overlap in scope, either because of servers in a network design, or a failure condition based on servers not communicating and synchronizing their data to each other. (Wikipedia)

To solve the problem and achieve data consistency, I introduced the intermediate kafka topic: user.assessment.feature as the point of truth, allowing the storage services to apply retry/audit on the data stream, and to fix inconsistencies caused by network glitch or server crashes. 
