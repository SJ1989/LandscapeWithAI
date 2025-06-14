-- Create styles table
CREATE TABLE styles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    thumbnail_url VARCHAR(500),
    example_urls JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Create indexes
CREATE INDEX idx_styles_category ON styles(category);
CREATE INDEX idx_styles_is_active ON styles(is_active);
CREATE INDEX idx_styles_name ON styles(name);