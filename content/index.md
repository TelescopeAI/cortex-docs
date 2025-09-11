---
seo:
  title: Cortex - Headless BI & Semantic Analytics Platform
  description: Lightweight, modular analytics platform with semantic layer for unified data access across heterogeneous sources. FastAPI-powered REST API for building customer-facing analytics applications.
---

::u-page-hero
#title
Cortex

#subtitle
Headless BI & Semantic Analytics Platform

#description
A lightweight, modular analytics engine built in Python to power customer-facing analytics applications. Provides a unified semantic layer for defining business data models, a dynamic query engine that integrates with heterogeneous data sources, and a robust user management and authorization system—all accessible via a FastAPI-powered REST API.

#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /getting-started/installation
  trailing-icon: i-lucide-arrow-right
  ---
  Get Started
  :::

  :::u-button
  ---
  color: neutral
  icon: i-lucide-github
  size: xl
  to: https://github.com/TelescopeAI/cortex
  variant: outline
  ---
  View on GitHub
  :::
::

::u-page-section
#title
Core Capabilities

#features
  :::u-page-feature
  ---
  icon: i-lucide-brain
  ---
  #title
  Semantic Layer

  #description
  Define and manage data models in JSON with measures, dimensions, and filters. Dynamic schema generation with plugin support and advanced output formatting for both query-time and post-execution transformations.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-cpu
  ---
  #title
  Query Engine

  #description
  Translates semantic definitions into optimized queries across multiple data sources. Supports PostgreSQL, BigQuery, MongoDB, and more with real-time output formatting during query execution.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-building-2
  ---
  #title
  Multi-Tenant Architecture

  #description
  Hierarchical organization with workspaces, environments, and consumer groups. Supports multiple organizations with proper data isolation and environment-level configurations.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-plug
  ---
  #title
  Data Source Integration

  #description
  Extensible database connector system supporting PostgreSQL, BigQuery, MongoDB, and more. Factory pattern enables easy addition of new data sources without code changes.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-api
  ---
  #title
  REST API First

  #description
  All functionality exposed via FastAPI-based REST endpoints with clear separation of admin and end-user API flows. Auto-generated OpenAPI documentation with Scalar FastAPI.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bar-chart-3
  ---
  #title
  Dashboard Engine

  #description
  Vue.js frontend for creating and managing dashboards with multiple chart types. ECharts integration with advanced features like data zoom, tooltips, and real-time preview.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield
  ---
  #title
  Type Safety & Validation

  #description
  Comprehensive Pydantic validation throughout the system ensuring runtime type safety, automatic API documentation, and robust error handling.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  AI Agent Ready

  #description
  Designed with AI agent integration in mind. Natural language interface capabilities, intelligent query optimization, and automated insights generation through structured semantic models.
  :::
::

::u-page-section
#title
Use Cases

#features
  :::u-page-feature
  ---
  icon: i-lucide-trending-up
  ---
  #title
  Customer-Facing Analytics

  #description
  Build white-labeled analytics dashboards for your customers. Provide business users with self-service analytics without exposing underlying database complexity.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-building
  ---
  #title
  Enterprise Data Democratization

  #description
  Enable business users to access and analyze data through semantic models. Reduce dependency on data teams while maintaining data governance and security.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-plug
  ---
  #title
  Data Integration Platform

  #description
  Unify data from multiple sources into a single semantic layer. Provide consistent business definitions and metrics across different systems and teams.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-brain
  ---
  #title
  AI-Powered Analytics

  #description
  Foundation for natural language querying and AI-driven insights. Structured semantic models enable AI agents to understand business context and generate intelligent analytics.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield
  ---
  #title
  Multi-Tenant SaaS Analytics

  #description
  Perfect for building analytics platforms serving multiple customers. Hierarchical organization ensures proper data isolation and tenant-specific configurations.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Rapid Dashboard Development

  #description
  Visual dashboard builder with drag-and-drop interface. Enable business users to create and share insights without technical implementation.
  :::
::


::u-page-section
#title
Architecture Overview

#description
Cortex follows a layered architecture ensuring modularity, maintainability, and independent evolution of core components.

#features
  :::u-page-feature
  ---
  icon: i-lucide-layers
  ---
  #title
  Layered Architecture

  #description
  Clear separation of concerns with distinct layers for API, business logic, data access, and storage. Enables independent scaling, testing, and maintenance of each component.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-git-branch
  ---
  #title
  Factory Pattern

  #description
  Extensible database connector system using factory pattern. Supports multiple database types with unified interface, making it easy to add new connectors without modifying existing code.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-users
  ---
  #title
  Multi-Tenant Hierarchy

  #description
  Hierarchical organization structure supporting organizations, workspaces, environments, and consumer groups. Provides natural data isolation and access control boundaries.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-type
  ---
  #title
  Type Safety

  #description
  Comprehensive Pydantic validation ensuring runtime type safety, automatic API documentation generation, and robust error handling throughout the system.
  :::
::

::u-page-section
#title
Technology Stack

#description
Built with modern Python technologies and best practices for scalable, maintainable analytics platforms.

#features
  :::u-page-feature
  ---
  icon: i-lucide-code
  ---
  #title
  Modern Python Stack

  #description
  Built with Python 3.12+ featuring async/await, type hints, and modern language features. Uses Poetry for dependency management and follows Python packaging best practices.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  ---
  #title
  Database Flexibility

  #description
  Supports multiple database types through extensible connector system. Currently includes PostgreSQL, BigQuery, and MongoDB with easy addition of new databases.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe
  ---
  #title
  API-First Design

  #description
  REST API first approach with FastAPI providing automatic OpenAPI documentation, request/response validation, and dependency injection capabilities.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-eye
  ---
  #title
  Rich Visualization

  #description
  Modern Vue.js frontend with ECharts integration for advanced charting capabilities including stacked charts, data zoom, tooltips, and real-time data updates.
  :::
::