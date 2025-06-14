-- Create designs table
CREATE TABLE designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    original_image_id UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    style_id UUID NOT NULL REFERENCES styles(id),
    current_image_url VARCHAR(500),
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_designs_user_id ON designs(user_id);
CREATE INDEX idx_designs_original_image_id ON designs(original_image_id);
CREATE INDEX idx_designs_style_id ON designs(style_id);
CREATE INDEX idx_designs_created_at ON designs(created_at);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_designs_updated_at BEFORE UPDATE ON designs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();