-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for intakes table
DROP TRIGGER IF EXISTS update_intakes_updated_at ON intakes;
CREATE TRIGGER update_intakes_updated_at
    BEFORE UPDATE ON intakes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create triggers for caregiver_applications table
DROP TRIGGER IF EXISTS update_caregiver_applications_updated_at ON caregiver_applications;
CREATE TRIGGER update_caregiver_applications_updated_at
    BEFORE UPDATE ON caregiver_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
