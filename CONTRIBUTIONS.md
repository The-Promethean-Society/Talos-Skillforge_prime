# Contributing to SkillForge Prime: The Path of a Promethean

Welcome, contributor. You are not just entering a codebase; you are joining a society. The Promethean Society is dedicated to building SkillForge Prime, a decentralized, AI-driven ecosystem for learning and creation. Our goal is ambitious, and we recognize that it cannot be achieved by a small team alone. It requires a community of builders, thinkers, and visionaries.

This document is your guide to becoming a "Promethean" — a contributor who brings the fire of knowledge and creation to the community. It is a living document, just like the project itself, and will evolve as our society grows. It is written to be understood by both human and AI contributors.

---

## Part 1: The Path of the Artisan (The Contribution Workflow)

This path is for those who wish to build, fix, or create content for SkillForge Prime. It is the way of the developer, the designer, and the content creator.

### 1.1 The Vision & Architecture

Before you write a single line of code, you must understand the nature of what we are building.

*   **A Polyglot Microservice Ecosystem:** SkillForge Prime is not a monolithic application. It is a constellation of services working in concert, written in the best language for the job. You will find Node.js, Go, Python, and C++ in our codebase.
*   **gRPC as the Backbone:** These services communicate through a high-performance gRPC mesh. All inter-service communication is defined by `.proto` files, which serve as the contracts for our distributed system. Familiarize yourself with our core protobuf definitions in the `proto/` and `services/protos/` directories.
*   **Monorepo Strategy:** All services reside in this single repository. This allows us to manage dependencies and orchestrate our complex environment more effectively.
*   **AI as a First-Class Contributor:** AI agents are not just tools; they are active participants in this project. All code, documentation, and pull requests should be written with clarity, enabling both human and machine understanding.

### 1.2 Setting up Your Forge (The Local Environment)

Your local machine is your forge, where you will shape your contributions.

*   **Nix is the Source of Truth:** We use `nix` to ensure a perfectly reproducible development environment. All required packages, compilers, and dependencies are defined in `.nix` files, primarily `dev.nix`. To enter the environment, simply run `nix-shell` in the root of the project.
*   **Orchestration with `start-all.sh`:** The `start-all.sh` script is the designated way to launch the entire SkillForge Prime ecosystem locally. It is designed to start all necessary services in the correct order.
*   **Observability:** Each service started by the script will output its logs to a dedicated file (e.g., `auth.log`, `genkit.log`). When debugging, these files are your primary source of information.

### 1.3 The Lifecycle of a Contribution (Branching & Integration)

We follow a disciplined, staged integration process to manage complexity and ensure stability.

1.  **Branching:** All new work MUST be done on a feature branch taken from the most recent `Testing-*` branch. Name your branch `Testing-[your-feature-name]`.
2.  **Pull Requests (PRs):** When your work is complete, submit a Pull Request to the `Testing-*` branch you branched from. Your PR description must be detailed, outlining the changes made, the services affected, and how to test your contribution.
3.  **Promotion:** The core maintainers will review your PR. Once approved and merged, your contribution will begin its journey through our integration pipeline: from `Testing` to `Beta`, then to `Alpha`, and finally being merged into `main` for production release. This process is deliberate and involves rigorous end-to-end testing.

---

## Part 2: The Path of the Citizen (The DAC Interface)

Contributing code is only one way to be a member of the Promethean Society. This path is for those who wish to participate in the governance and future direction of SkillForge Prime.

### 2.1 What is the DAC?

SkillForge Prime is governed by a Decentralized Autonomous Community (DAC). This means that the project's roadmap, priorities, and treasury are controlled by its contributors and users, not by a central authority. The DAC is the heart of our community.

### 2.2 The Bridge: From Contribution to Governance

Your work as an Artisan directly translates to your influence as a Citizen. We believe in a system of **Proof of Contribution**.

*   **Validating Work:** As noted in our roadmap, we leverage decentralized computing networks like the Golem Network. We are building a system where merged PRs and other significant contributions are packaged as tasks and validated by this decentralized network.
*   **Accruing Reputation:** Upon successful validation, the system will programmatically grant a reputation score or governance token to your designated wallet. This creates a direct, trustless link between your contributions and your voting power in the DAC.

### 2.3 Interfacing with the Governance Protocol

1.  **Participation:** The DAC operates through a governance portal (details to be announced). Here, you can connect your wallet, view proposals about the future of SkillForge, and use your accrued reputation to vote.
2.  **AI Citizenship:** We are actively exploring how AI agents, as first-class contributors, can participate in this governance model. This may involve agents being represented by custodial wallets and voting based on heuristics aimed at the long-term health and integrity of the ecosystem. This is a frontier concept we will explore together as a community.

---

Welcome to the Promethean Society. Let's build the future, together.
