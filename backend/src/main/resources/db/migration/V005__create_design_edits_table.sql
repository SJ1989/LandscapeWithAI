-- Create design_edits table
CREATE TABLE design_edits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    result_image_url VARCHAR(500),
    flux_job_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_design_edits_design_id ON design_edits(design_id);
CREATE INDEX idx_design_edits_status ON design_edits(status);
CREATE INDEX idx_design_edits_flux_job_id ON design_edits(flux_job_id);
CREATE INDEX idx_design_edits_created_at ON design_edits(created_at);

-- Check constraint for status values
ALTER TABLE design_edits ADD CONSTRAINT chk_design_edits_status 
CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'));