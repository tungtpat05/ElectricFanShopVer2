-- Using for delete image on cloud
ALTER TABLE Brands ADD logo_public_id NVARCHAR(255) NULL;
ALTER TABLE Categories ADD logo_public_id NVARCHAR(255) NULL;
ALTER TABLE Products ADD thumbnail_public_id NVARCHAR(255) NULL;

