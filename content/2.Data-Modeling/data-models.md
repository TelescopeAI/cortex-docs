---
navigation:
  icon: i-lucide-database
title: Data Models
description: Foundation of Cortex's analytical architecture, representing collections of related metrics with shared configuration.
---

## Overview

Data Models serve as containers for metrics and define the relationships between different analytical components. Each data model is tied to a specific data source and supports versioning, validation, and metadata management.

![Data Model Architecture](placeholder://data-model-architecture.png)
*Overview of how Data Models fit into the Cortex ecosystem*

## Use Cases

Data Models are used for:
- **Business Domain Organization**: Group related metrics by business area
- **Data Source Management**: Manage multiple data sources and their relationships
- **Version Control**: Track changes and maintain audit trails
- **Validation**: Ensure data integrity and consistency
- **Access Control**: Manage permissions at the model level
- **Performance Optimization**: Share common configurations across metrics

## Core Components

### DataModel Class

The `DataModel` class is the central component that defines the structure and behavior of data models.

**Location:** `cortex/core/data/modelling/model.py`

#### Properties

```python
class DataModel(TSModel):
    id: UUID = Field(default_factory=uuid4)          # Auto-generated unique identifier
    data_source_id: UUID                             # Reference to connected data source
    name: str                                        # Human-readable name
    alias: Optional[str] = None                      # Alternative name for APIs
    description: Optional[str] = None                # Detailed description
    version: int = 1                                # Version number for change tracking
    is_active: bool = True                          # Whether model is currently active
    parent_version_id: Optional[UUID] = None        # For version branching
    config: Dict[str, Any] = Field(default_factory=dict)  # Custom configuration
    is_valid: bool = False                          # Validation status
    validation_errors: Optional[List[str]] = None   # Validation error messages
    created_at: datetime                            # Creation timestamp
    updated_at: datetime                            # Last update timestamp
```

### Model Versioning

Data Models support comprehensive versioning for tracking changes and maintaining audit trails.

**Location:** `cortex/core/data/modelling/model_version.py`

```python
class ModelVersion(TSModel):
    id: UUID = Field(default_factory=uuid4)
    data_model_id: UUID                          # Parent data model reference
    version_number: int                          # Incremental version number
    semantic_model: Dict[str, Any] = Field(default_factory=dict)
    is_valid: bool = False                       # Validation status for this version
    validation_errors: Optional[List[str]] = None
    compiled_queries: Optional[Dict[str, str]] = None  # Cached queries
    description: Optional[str] = None           # Change description
    created_by: Optional[UUID] = None           # User who created version
    tags: Optional[List[str]] = None            # Categorization tags
    created_at: datetime                        # Version creation timestamp
```

## Services

### Validation Service

The `ValidationService` provides comprehensive validation for data models and their components.

**Location:** `cortex/core/data/modelling/validation_service.py`

**Key Features:**
- **Syntax Validation**: Ensures proper JSON structure and required fields
- **Semantic Validation**: Verifies business logic and data relationships
- **Dependency Validation**: Checks for missing or invalid references
- **Performance Validation**: Identifies potential performance issues

```python
class ValidationService:
    @staticmethod
    def validate_data_model(data_model: DataModel) -> ValidationResult:
        """Perform comprehensive validation of a DataModel."""

class ValidationResult:
    is_valid: bool
    errors: List[str]
    warnings: List[str]
    validated_at: datetime
```

### Metric Service

The `MetricService` handles metric operations within data models.

**Location:** `cortex/core/data/modelling/metric_service.py`

**Key Features:**
- **Metric Extraction**: Extract metrics from data model configurations
- **Metric Resolution**: Resolve metric dependencies and references
- **Extension Processing**: Handle metric inheritance and extensions
- **Validation Integration**: Coordinate with validation service

```python
class MetricService:
    @staticmethod
    def extract_metrics_from_model(data_model: DataModel) -> List[SemanticMetric]:
        """Extract individual metrics from a data model."""

    @staticmethod
    def get_metric_by_alias(data_model: DataModel, alias: str) -> Optional[SemanticMetric]:
        """Get a specific metric by alias."""
```

## API Integration

Data Models are fully integrated with Cortex's REST API through dedicated endpoints.

**Location:** `cortex/api/routers/data/models.py`

### Available Endpoints

- `POST /data/models` - Create a new data model
- `GET /data/models/{id}` - Retrieve a specific data model
- `GET /data/models` - List data models with pagination
- `PUT /data/models/{id}` - Update an existing data model
- `DELETE /data/models/{id}` - Delete a data model (soft delete)
- `POST /data/models/{id}/validate` - Validate a data model
- `POST /data/models/{id}/execute` - Execute a data model query

### Request/Response Schemas

The API uses Pydantic models for type validation and automatic documentation:

```python
# Creation Request
DataModelCreateRequest:
    name: str
    alias: Optional[str]
    description: Optional[str]
    data_source_id: UUID
    config: Optional[Dict[str, Any]]

# Response
DataModelResponse:
    id: UUID
    data_source_id: UUID
    name: str
    alias: Optional[str]
    description: Optional[str]
    version: int
    is_active: bool
    config: Dict[str, Any]
    is_valid: bool
    validation_errors: Optional[List[str]]
    metrics_count: int  # Computed field
    created_at: datetime
    updated_at: datetime
```

## Configuration Examples

### Basic Data Model

```json
{
    "name": "customer_analytics",
    "alias": "customers",
    "description": "Customer behavior and revenue analytics",
    "data_source_id": "550e8400-e29b-41d4-a716-446655440001",
    "config": {
        "default_timezone": "UTC",
        "cache_enabled": true,
        "max_query_timeout": 300
    }
}
```

### Advanced Configuration

```json
{
    "name": "ecommerce_metrics",
    "description": "Comprehensive e-commerce analytics model",
    "data_source_id": "550e8400-e29b-41d4-a716-446655440002",
    "config": {
        "performance": {
            "query_timeout": 600,
            "max_parallel_queries": 10
        },
        "caching": {
            "default_ttl": 3600,
            "warmup_enabled": true
        },
        "validation": {
            "strict_mode": true,
            "dependency_check": true
        }
    }
}
```

## Version Management

### Creating Versions

```python
# Automatic versioning on model updates
model.version += 1
model.updated_at = datetime.now(pytz.UTC)

# Create version snapshot
version = ModelVersion(
    data_model_id=model.id,
    version_number=model.version,
    semantic_model=model.to_dict(),
    description="Updated customer segmentation logic",
    created_by=user_id,
    tags=["enhancement", "customer-analytics"]
)
```

### Version History

```python
# Retrieve version history
versions = db_service.get_model_versions(model_id)
for version in versions:
    print(f"Version {version.version_number}: {version.description}")
    print(f"Created: {version.created_at}")
    print(f"Valid: {version.is_valid}")
```

## Validation Workflow

### Automatic Validation

Data models are automatically validated during:
- **Creation**: When a new model is created
- **Updates**: When significant fields are modified
- **Execution**: Before queries are executed
- **Scheduled Checks**: Periodic validation for active models

### Validation Process

```python
# Validation workflow
validation_result = ValidationService.validate_data_model(data_model)

# Update model status
data_model.is_valid = validation_result.is_valid
data_model.validation_errors = validation_result.errors if validation_result.errors else None

# Log warnings
if validation_result.warnings:
    logger.warning(f"Validation warnings for model {data_model.id}: {validation_result.warnings}")
```

## Best Practices

### Model Organization
1. **Domain-driven Design**: Group metrics by business domain
2. **Consistent Naming**: Use clear, descriptive names
3. **Documentation**: Always include detailed descriptions
4. **Version Control**: Use meaningful version descriptions

### Performance Optimization
1. **Efficient Queries**: Optimize metric queries for performance
2. **Caching Strategy**: Configure appropriate cache settings
3. **Index Management**: Ensure proper database indexing
4. **Batch Operations**: Use bulk operations when possible

### Validation and Testing
1. **Regular Validation**: Run validation checks regularly
2. **Test Coverage**: Test models with various data scenarios
3. **Error Handling**: Implement proper error handling
4. **Monitoring**: Monitor validation status and performance

## Integration with Metrics

Data Models are closely integrated with the metrics system:

- **Metric Organization**: Metrics belong to data models
- **Shared Configuration**: Models provide common settings for metrics
- **Dependency Management**: Models manage relationships between metrics
- **Access Control**: Model-level permissions apply to all metrics

## Video Tutorial

[![Data Models Setup Tutorial](placeholder://video-thumbnail.png)](placeholder://data-models-tutorial-video.mp4)
*Video: Complete guide to setting up and managing data models in Cortex*

## Dashboard Interface

![Data Models Dashboard](placeholder://data-models-dashboard.png)
*Screenshot of the data models management interface in the Cortex dashboard*

## Related Topics

- **[Metrics Configuration](./metrics.md)** - Learn about configuring metrics within data models
- **[Semantic Components](../3.semantics/)** - Understand the semantic components that power data models
- **[Data Sources](../4.api/)** - Connect data models to various data sources
- **[API Reference](../4.api/)** - Detailed API documentation for data model operations
