-- Create function to calculate shift duration and cost
CREATE OR REPLACE FUNCTION calculate_shift_metrics()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate duration in hours if both start and end times exist
    IF NEW.start_time IS NOT NULL AND NEW.end_time IS NOT NULL THEN
        NEW.duration_hours := EXTRACT(EPOCH FROM (NEW.end_time - NEW.start_time)) / 3600.0;
    END IF;
    
    -- Calculate total cost
    IF NEW.duration_hours IS NOT NULL AND NEW.hourly_rate IS NOT NULL THEN
        NEW.total_cost := NEW.duration_hours * NEW.hourly_rate;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically calculate values
DROP TRIGGER IF EXISTS calculate_shift_metrics_trigger ON shifts;
CREATE TRIGGER calculate_shift_metrics_trigger
    BEFORE INSERT OR UPDATE ON shifts
    FOR EACH ROW
    EXECUTE FUNCTION calculate_shift_metrics();

-- Update existing shifts to calculate values
UPDATE shifts SET 
    duration_hours = EXTRACT(EPOCH FROM (end_time - start_time)) / 3600.0
WHERE start_time IS NOT NULL 
AND end_time IS NOT NULL 
AND duration_hours IS NULL;

UPDATE shifts SET 
    total_cost = duration_hours * hourly_rate
WHERE duration_hours IS NOT NULL 
AND hourly_rate IS NOT NULL 
AND total_cost IS NULL;

SELECT 'Shift calculation trigger created successfully!' as message;
