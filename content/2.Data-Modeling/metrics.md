---
navigation:
  icon: i-lucide-bar-chart-3
title: Metrics
description: Core building blocks of analytical data models, defining what data should be measured and how it can be sliced for analysis.
---

## Overview

A `SemanticMetric` belongs to a data model and contains its own measures, dimensions, joins, and aggregations. Metrics can be executed independently and support custom SQL queries with extensive configuration options for caching, refresh policies, and data processing.

![Metrics Architecture](placeholder://metrics-architecture.png)
*How metrics fit into the data modeling ecosystem*

## Relationship to Data Models

Metrics are always associated with a data model and inherit certain properties:

- **Data Source**: Metrics connect through their parent data model
- **Configuration**: Shared model-level settings apply to all metrics
- **Validation**: Model validation includes metric validation
- **Versioning**: Metric changes are tracked through model versions
- **Permissions**: Access control is managed at the model level

For detailed information about data models, see [Data Models Configuration](./data-models.md).

## Specification

### id

**Type:** `UUID`  
**Default:** Auto-generated using `uuid4()`  
**Required:** No (auto-generated)

Unique identifier for the metric instance. Automatically generated when a new metric is created.

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### data_model_id

**Type:** `UUID`  
**Required:** Yes

Foreign key reference to the parent data model that this metric belongs to.

```json
{
    "data_model_id": "550e8400-e29b-41d4-a716-446655440001"
}
```

### name

**Type:** `str`  
**Required:** Yes

Unique identifier name for this metric within the data model. Used for API queries and references.

```json
{
    "name": "user_revenue_analysis"
}
```

### alias

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Optional alternative name for display purposes. Can be used in UI components or API responses.

```json
{
    "alias": "revenue_by_user"
}
```

### description

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Human-readable explanation of what this metric represents and its purpose.

```json
{
    "description": "Comprehensive revenue analysis by user segments"
}
```

### title

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Human-readable display name for UI components and documentation.

```json
{
    "title": "User Revenue Analysis"
}
```

### query

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Custom SQL query string that **overrides the entire auto-generated query**. When provided, this query will be used instead of building a query from measures, dimensions, and joins.

```json
{
    "query": "SELECT COUNT(*) FROM users WHERE active = true"
}
```

### table_name

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Source table or view where this metric's data resides. Used as the primary table for auto-generated queries.

```json
{
    "table_name": "users"
}
```

### data_source_id

**Type:** `Optional[UUID]`  
**Default:** `None`  
**Required:** No

Foreign key reference to the data source connection. Specifies which database or data source this metric queries.

```json
{
    "data_source_id": "550e8400-e29b-41d4-a716-446655440002"
}
```

### limit

**Type:** `Optional[int]`  
**Default:** `None`  
**Required:** No

Default limit for query results. Applied when no specific limit is provided in the query request.

```json
{
    "limit": 1000
}
```

### grouped

**Type:** `Optional[bool]`  
**Default:** `True`  
**Required:** No

Whether to apply GROUP BY when dimensions are present. When `True`, dimensions will be used to group the results.

```json
{
    "grouped": true
}
```

### ordered

**Type:** `Optional[bool]`  
**Default:** `True`  
**Required:** No

Whether to apply ordering to the query results. When `True`, the order sequences will be used to sort results.

```json
{
    "ordered": true
}
```

### order

**Type:** `Optional[List[SemanticOrderSequence]]`  
**Default:** `None`  
**Required:** No

List of order sequences defining how to sort the query results. Each sequence specifies what to sort by and how to sort it.

```json
{
    "order": [
        {
            "reference_type": "MEASURE",
            "reference": "total_revenue",
            "order_type": "DESC",
            "nulls_position": "LAST"
        },
        {
            "reference_type": "DIMENSION",
            "reference": "month", 
            "order_type": "ASC",
            "nulls_position": "FIRST"
        }
    ]
}
```

**Order Sequence Properties:**
- **reference_type**: Type of reference (`MEASURE`, `DIMENSION`, `COLUMN`, `POSITION`)
- **reference**: Name of the measure, dimension, column, or position number
- **order_type**: Sort direction (`ASC` or `DESC`)
- **nulls_position**: Where to place null values (`FIRST` or `LAST`)

### version

**Type:** `int`  
**Default:** `1`  
**Required:** No

Metric version for caching invalidation and change tracking. Incremented when the metric configuration changes.

```json
{
    "version": 1
}
```

### extends

**Type:** `Optional[UUID]`  
**Default:** `None`  
**Required:** No

Parent metric ID for inheritance patterns. Allows metrics to inherit configuration from a parent metric.

```json
{
    "extends": "550e8400-e29b-41d4-a716-446655440003"
}
```

### public

**Type:** `bool`  
**Default:** `True`  
**Required:** No

Whether this metric can be queried via API. When `False`, the metric is only accessible internally.

```json
{
    "public": true
}
```

### meta

**Type:** `Optional[Dict[str, Any]]`  
**Default:** `None`  
**Required:** No

Custom metadata dictionary for storing additional information about the metric.

```json
{
    "meta": {
        "category": "revenue",
        "owner": "analytics_team",
        "tags": ["kpi", "financial"]
    }
}
```

### is_valid

**Type:** `bool`  
**Default:** `False`  
**Required:** No

Boolean indicating if the metric configuration is valid. Set to `True` after successful validation.

```json
{
    "is_valid": true
}
```

### validation_errors

**Type:** `Optional[List[str]]`  
**Default:** `None`  
**Required:** No

Array of error messages from validation. Populated when `is_valid` is `False`.

```json
{
    "validation_errors": [
        "Missing required dimension: user_id",
        "Invalid join condition: table 'orders' not found"
    ]
}
```

### compiled_query

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Generated SQL query after compilation. Shows the final query that will be executed.

```json
{
    "compiled_query": "SELECT segment_type, SUM(revenue_amount) as total_revenue FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' GROUP BY segment_type"
}
```

### created_at

**Type:** `datetime`  
**Default:** Current UTC timestamp  
**Required:** No

Timestamp when the metric was created.

```json
{
    "created_at": "2024-01-15T10:00:00Z"
}
```

### updated_at

**Type:** `datetime`  
**Default:** Current UTC timestamp  
**Required:** No

Timestamp when the metric was last updated.

```json
{
    "updated_at": "2024-01-15T10:00:00Z"
}
```

## measures

**Type:** `Optional[List[SemanticMeasure]]`  
**Default:** `None`  
**Required:** No

List of quantitative measurements included in this metric. Each measure defines what data should be quantified and how it should be calculated.

```json
{
    "measures": [
        {
            "name": "total_revenue",
            "description": "Sum of all revenue",
            "type": "sum",
            "query": "revenue_amount",
            "table": "orders",
            "alias": "revenue",
            "primary_key": "order_id",
            "formatting": [
                {
                    "name": "currency_format",
                    "type": "format",
                    "format_type": "currency",
                    "format_string": "$%.2f"
                }
            ]
        }
    ]
}
```

### Quick Reference

- **name**: Unique identifier for the measure
- **description**: Human-readable explanation
- **type**: Calculation type (sum, avg, count, etc.)
- **query**: Custom query expression
- **table**: Source table or view
- **alias**: Alternative name for results
- **primary_key**: Primary key column identifier
- **formatting**: Output transformation rules

### Detailed Configuration

For comprehensive information about configuring measures, including all parameters, examples, and best practices, see the [Measures Configuration Guide](../3.semantics/2.measures.md).

![Measures Configuration Interface](placeholder://measures-config-interface.png)
*Screenshot of the measures configuration interface in the Cortex dashboard*

## dimensions

**Type:** `Optional[List[SemanticDimension]]`  
**Default:** `None`  
**Required:** No

List of categorical attributes by which the measures can be grouped. Dimensions define how data should be categorized and filtered.

```json
{
    "dimensions": [
        {
            "name": "user_segment",
            "description": "User segmentation category",
            "query": "segment_type",
            "table": "users",
            "formatting": [
                {
                    "name": "segment_display",
                    "type": "format",
                    "format_type": "custom",
                    "format_string": "Segment: {value}"
                }
            ]
        }
    ]
}
```

### Quick Reference

- **name**: Unique identifier for the dimension
- **description**: Human-readable explanation
- **query**: Column name or expression
- **table**: Source table or view
- **formatting**: Display transformation rules

### Detailed Configuration

For comprehensive information about configuring dimensions, including all parameters, examples, and best practices, see the [Dimensions Configuration Guide](../3.semantics/3.dimensions.md).

![Dimensions Configuration Interface](placeholder://dimensions-config-interface.png)
*Screenshot of the dimensions configuration interface in the Cortex dashboard*

## joins

**Type:** `Optional[List[SemanticJoin]]`  
**Default:** `None`  
**Required:** No

List of joins to be applied in the query. Defines relationships between tables for data combination.

```json
{
    "joins": [
        {
            "name": "user_orders",
            "description": "Join users with their orders",
            "join_type": "left",
            "left_table": "users",
            "right_table": "orders",
            "conditions": [
                {
                    "left_table": "users",
                    "left_column": "id",
                    "right_table": "orders",
                    "right_column": "user_id",
                    "operator": "="
                }
            ],
            "alias": "user_orders",
            "additional_conditions": [
                {
                    "left_table": "orders",
                    "left_column": "status",
                    "right_table": "order_statuses",
                    "right_column": "status_code",
                    "operator": "="
                }
            ],
            "join_hints": {
                "use_index": "idx_user_id",
                "force_order": true
            }
        }
    ]
}
```

### Quick Reference

- **name**: Unique identifier for the join
- **description**: Human-readable explanation
- **join_type**: Type of join (inner, left, right, full, cross)
- **left_table**: Primary table name
- **right_table**: Table to join with
- **conditions**: Array of join conditions
- **alias**: Optional alias for the joined table
- **additional_conditions**: Additional join conditions
- **join_hints**: Database optimization hints

### Detailed Configuration

For comprehensive information about configuring joins, including all parameters, examples, and best practices, see the [Joins Configuration Guide](../3.semantics/4.joins.md).

![Joins Configuration Interface](placeholder://joins-config-interface.png)
*Screenshot of the visual join builder in the Cortex dashboard*
## aggregations

**Type:** `Optional[List[SemanticAggregation]]`  
**Default:** `None`  
**Required:** No

List of aggregations to be applied to the data. Defines complex aggregations beyond basic measures.

```json
{
    "aggregations": [
        {
            "name": "revenue_percentile",
            "description": "95th percentile of revenue",
            "type": "percentile",
            "source_columns": ["revenue"],
            "target_column": "revenue_p95",
            "percentile_value": 0.95,
            "where_condition": "status = 'completed'",
            "window": {
                "partition_by": ["user_segment"],
                "order_by": ["created_at"],
                "frame_start": "UNBOUNDED PRECEDING",
                "frame_end": "CURRENT ROW"
            }
        },
        {
            "name": "custom_metric",
            "description": "Custom calculation",
            "type": "custom",
            "source_columns": ["revenue", "cost"],
            "target_column": "profit_margin",
            "custom_expression": "(revenue - cost) / revenue * 100"
        }
    ]
}
```

### Quick Reference

- **name**: Unique identifier for the aggregation
- **description**: Human-readable explanation
- **type**: Aggregation type (percentile, custom, window functions, etc.)
- **source_columns**: Columns to aggregate
- **target_column**: Result column name
- **custom_expression**: SQL expression for custom aggregations
- **window**: Window function parameters
- **percentile_value**: Value for percentile aggregations
- **where_condition**: SQL condition for conditional aggregations
- **group_by_columns**: Columns for grouped aggregations

### Detailed Configuration

For comprehensive information about configuring aggregations, including all parameters, examples, and best practices, see the [Aggregations Configuration Guide](../3.semantics/5.aggregations.md).

![Aggregations Configuration Interface](placeholder://aggregations-config-interface.png)
*Screenshot of the aggregations configuration interface in the Cortex dashboard*

## filters

**Type:** `Optional[List[SemanticFilter]]`  
**Default:** `None`  
**Required:** No

List of filters to be applied to the data. Defines data filtering conditions for WHERE or HAVING clauses.

```json
{
    "filters": [
        {
            "name": "active_users",
            "description": "Filter for active users only",
            "query": "status",
            "table": "users",
            "operator": "equals",
            "value": "active",
            "value_type": "string",
            "filter_type": "where",
            "is_active": true
        },
        {
            "name": "revenue_range",
            "description": "Revenue between limits",
            "query": "revenue",
            "operator": "between",
            "min_value": 1000,
            "max_value": 10000,
            "value_type": "number",
            "filter_type": "having"
        },
        {
            "name": "segment_filter",
            "description": "Multiple segment filter",
            "query": "segment",
            "operator": "in",
            "values": ["premium", "enterprise"],
            "value_type": "string"
        }
    ]
}
```

### Quick Reference

- **name**: Unique identifier for the filter
- **description**: Human-readable explanation
- **query**: Column name or expression
- **table**: Source table name
- **operator**: Comparison operator (equals, between, in, etc.)
- **value**: Single comparison value
- **value_type**: Type of the filter value
- **filter_type**: Where to apply (where/having)
- **is_active**: Whether filter is currently active
- **custom_expression**: Custom SQL expression
- **values**: Array of values for IN/NOT_IN operators
- **min_value/max_value**: Range values for BETWEEN operator
- **formatting**: Filter value transformation rules

### Detailed Configuration

For comprehensive information about configuring filters, including all parameters, examples, and best practices, see the [Filters Configuration Guide](../3.semantics/6.filters.md).

![Filters Configuration Interface](placeholder://filters-config-interface.png)
*Screenshot of the filter builder interface in the Cortex dashboard*

## parameters

**Type:** `Optional[Dict[str, ParameterDefinition]]`  
**Default:** `None`  
**Required:** No

Runtime parameters for dynamic query generation. Allows metrics to accept parameters at query time.

```json
{
    "parameters": {
        "date_range": {
            "name": "date_range",
            "type": "date",
            "description": "Date range for filtering",
            "required": true,
            "default_value": "2024-01-01"
        },
        "user_segment": {
            "name": "user_segment",
            "type": "string",
            "description": "User segment to filter by",
            "required": false,
            "allowed_values": ["premium", "standard", "basic"],
            "default_value": "standard"
        },
        "revenue_threshold": {
            "name": "revenue_threshold",
            "type": "float",
            "description": "Minimum revenue threshold",
            "min_value": 0.0,
            "max_value": 1000000.0,
            "default_value": 1000.0
        }
    }
}
```

### Quick Reference

- **name**: Parameter identifier name
- **type**: Parameter data type (string, integer, float, boolean, date, datetime, list)
- **description**: Human-readable explanation
- **default_value**: Default value if not provided
- **required**: Whether the parameter is mandatory
- **allowed_values**: Array of valid values for enum-like parameters
- **validation_regex**: Regular expression for string validation
- **min_value/max_value**: Range constraints for numeric parameters

### Detailed Configuration

For comprehensive information about configuring parameters, including all parameters, examples, and best practices, see the [Parameters Configuration Guide](../3.semantics/7.parameters.md).

![Parameters Configuration Interface](placeholder://parameters-config-interface.png)
*Screenshot of the parameter configuration interface in the Cortex dashboard*

## cache

**Type:** `Optional[CachePreference]`  
**Default:** `None`  
**Required:** No

Result cache configuration for metrics and requests.

```json
{
    "cache": {
        "enabled": true,
        "ttl": 3600
    }
}
```

### Quick Reference

- **enabled**: Whether result caching is active
- **ttl**: Time-to-live in seconds

### Detailed Configuration

For comprehensive information about configuring cache, including all parameters, examples, and best practices, see the [Cache Configuration Guide](../3.semantics/8.cache.md).

![Cache Configuration Interface](placeholder://cache-config-interface.png)
*Screenshot of the cache configuration interface in the Cortex dashboard*

## refresh

**Type:** `Optional[RefreshPolicy]`  
**Default:** `None`  
**Required:** No

Pre-aggregation refresh policy for materialized views and rollups.

```json
{
    "refresh": {
        "type": "every",
        "every": "1 hour"
    }
}
```

### Quick Reference

- **type**: Refresh strategy (every, sql, max)
- **every**: Time interval string for time-based refresh
- **sql**: Custom SQL query to determine if refresh is needed
- **max**: Column name to monitor for maximum value changes

### Detailed Configuration

For comprehensive information about configuring refresh policies, including all parameters, examples, and best practices, see the [Refresh Policy Configuration Guide](../3.semantics/9.refresh.md).

![Refresh Policy Configuration Interface](placeholder://refresh-config-interface.png)
*Screenshot of the refresh policy configuration interface in the Cortex dashboard*

### RefreshPolicy Parameters (Legacy)

#### type

**Type:** `RefreshType`  
**Required:** Yes

Refresh strategy. Available values:
- `every`: Time-based refresh intervals
- `sql`: Custom SQL condition for refresh
- `max`: Refresh based on maximum value changes

```json
{
    "type": "every"
}
```

#### every

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Time interval string for time-based refresh.

```json
{
    "every": "1 hour"
}
```

#### sql

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Custom SQL query to determine if refresh is needed.

```json
{
    "sql": "SELECT COUNT(*) FROM orders WHERE created_at > last_refresh"
}
```

#### max

**Type:** `Optional[str]`  
**Default:** `None`  
**Required:** No

Column name to monitor for maximum value changes.

```json
{
    "max": "updated_at"
}

## Complete Configuration Example

Here's a complete example showing how all the different components work together:

```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "data_model_id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "user_revenue_analysis",
    "alias": "revenue_by_user",
    "description": "Comprehensive revenue analysis by user segments",
    "title": "User Revenue Analysis",
    
    "query": null,
    "table_name": "users",
    "data_source_id": "550e8400-e29b-41d4-a716-446655440002",
    "limit": 1000,
    "grouped": true,
    
    "measures": [
        {
            "name": "total_revenue",
            "description": "Sum of all user revenue",
            "type": "sum",
            "query": "revenue_amount",
            "table": "orders",
            "formatting": [
                {
                    "name": "currency_format",
                    "type": "format",
                    "format_type": "currency",
                    "format_string": "$%.2f"
                }
            ]
        }
    ],
    
    "dimensions": [
        {
            "name": "user_segment",
            "description": "User segmentation category",
            "query": "segment_type",
            "table": "users"
        }
    ],
    
    "joins": [
        {
            "name": "user_orders",
            "description": "Join users with orders",
            "join_type": "left",
            "left_table": "users",
            "right_table": "orders",
            "conditions": [
                {
                    "left_table": "users",
                    "left_column": "id",
                    "right_table": "orders",
                    "right_column": "user_id",
                    "operator": "="
                }
            ]
        }
    ],
    
    "filters": [
        {
            "name": "active_users",
            "description": "Only active users",
            "query": "status",
            "table": "users",
            "operator": "equals",
            "value": "active",
            "value_type": "string",
            "filter_type": "where",
            "is_active": true
        }
    ],
    
    "parameters": {
        "date_range": {
            "name": "date_range",
            "type": "date",
            "description": "Analysis date range",
            "required": true
        }
    },
    
    "version": 1,
    "extends": null,
    "public": true,
    
    "refresh": {
        "type": "every",
        "every": "1 hour"
    },
    
    "cache": {
        "enabled": true,
        "ttl": 3600
    },
    
    "meta": {
        "category": "user_analytics",
        "owner": "data_team"
    },
    
    "is_valid": true,
    "validation_errors": null,
    "compiled_query": "SELECT segment_type, SUM(revenue_amount) as total_revenue FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' GROUP BY segment_type",
    
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
}
```

This comprehensive configuration demonstrates how all the different components work together to create a powerful, flexible metric definition that can handle complex analytical requirements while maintaining performance through caching and refresh policies.

## Configuration Guides

For detailed information about each configuration component, see the following guides:

- **[Measures Configuration](../3.semantics/2.measures.md)** - Quantitative metrics and calculations
- **[Dimensions Configuration](../3.semantics/3.dimensions.md)** - Categorical attributes for grouping
- **[Joins Configuration](../3.semantics/4.joins.md)** - Table relationships and data combination
- **[Aggregations Configuration](../3.semantics/5.aggregations.md)** - Advanced calculations and window functions
- **[Filters Configuration](../3.semantics/6.filters.md)** - Data filtering and segmentation
- **[Parameters Configuration](../3.semantics/7.parameters.md)** - Dynamic query parameters
- **[Cache Configuration](../3.semantics/8.cache.md)** - Performance optimization through caching
- **[Refresh Policy Configuration](../3.semantics/9.refresh.md)** - Data freshness and refresh strategies

## Video Tutorials

[![Complete Metric Configuration Tutorial](placeholder://video-thumbnail.png)](placeholder://complete-metric-tutorial-video.mp4)
*Video: Complete walkthrough of configuring a metric from start to finish in the Cortex dashboard*

## Dashboard Examples

![Metric Configuration Dashboard](placeholder://metric-config-dashboard.png)
*Screenshot of the complete metric configuration interface in the Cortex dashboard*

![Metric Results Dashboard](placeholder://metric-results-dashboard.png)
*Screenshot showing how configured metrics appear in the results dashboard*

## Related Topics

- [Data Models Configuration](./data-models.md) - Learn about the data models that contain metrics
- [Semantic Components](../3.semantics/) - Explore all semantic configuration options
- [API Reference](../4.api/) - Learn about metric management APIs
