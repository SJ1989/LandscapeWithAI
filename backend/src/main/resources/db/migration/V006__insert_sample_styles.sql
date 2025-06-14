-- Insert sample styles for development and testing
INSERT INTO styles (name, description, category, thumbnail_url, example_urls) VALUES
('Modern Minimalist', 'Clean lines, geometric shapes, and minimal plant variety with emphasis on hardscaping', 'Modern', 
 'https://example.com/thumbnails/modern-minimalist.jpg',
 '["https://example.com/examples/modern-min-1.jpg", "https://example.com/examples/modern-min-2.jpg"]'::jsonb),

('Traditional English Garden', 'Lush, romantic garden with mixed borders, climbing roses, and cottage garden plants', 'Traditional',
 'https://example.com/thumbnails/english-garden.jpg',
 '["https://example.com/examples/english-1.jpg", "https://example.com/examples/english-2.jpg"]'::jsonb),

('Zen Japanese', 'Peaceful and balanced design with rocks, water features, and carefully placed plants', 'Zen',
 'https://example.com/thumbnails/zen-japanese.jpg',
 '["https://example.com/examples/zen-1.jpg", "https://example.com/examples/zen-2.jpg"]'::jsonb),

('Mediterranean Courtyard', 'Warm colors, terracotta pots, herbs, and drought-resistant plants', 'Mediterranean',
 'https://example.com/thumbnails/mediterranean.jpg',
 '["https://example.com/examples/med-1.jpg", "https://example.com/examples/med-2.jpg"]'::jsonb),

('Native Plant Sanctuary', 'Eco-friendly design using native plants and natural materials', 'Eco-Friendly',
 'https://example.com/thumbnails/native-plants.jpg',
 '["https://example.com/examples/native-1.jpg", "https://example.com/examples/native-2.jpg"]'::jsonb),

('Urban Rooftop', 'Compact design optimized for small spaces with container gardening', 'Urban',
 'https://example.com/thumbnails/urban-rooftop.jpg',
 '["https://example.com/examples/urban-1.jpg", "https://example.com/examples/urban-2.jpg"]'::jsonb),

('Rustic Farmhouse', 'Country-style garden with raised beds, picket fences, and practical plants', 'Rustic',
 'https://example.com/thumbnails/rustic-farmhouse.jpg',
 '["https://example.com/examples/rustic-1.jpg", "https://example.com/examples/rustic-2.jpg"]'::jsonb),

('Tropical Paradise', 'Lush tropical plants, bold colors, and exotic flowers for warm climates', 'Tropical',
 'https://example.com/thumbnails/tropical.jpg',
 '["https://example.com/examples/tropical-1.jpg", "https://example.com/examples/tropical-2.jpg"]'::jsonb);