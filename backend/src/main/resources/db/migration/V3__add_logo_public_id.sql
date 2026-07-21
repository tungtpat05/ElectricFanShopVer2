-- Using for delete image on cloud
ALTER TABLE brand ADD logo_public_id NVARCHAR(255) NULL;
ALTER TABLE category ADD logo_public_id NVARCHAR(255) NULL;
ALTER TABLE product ADD thumbnail_public_id NVARCHAR(255) NULL;
ALTER TABLE product_image ADD image_public_id NVARCHAR(255) NULL;
ALTER TABLE product_variant ADD variant_image_public_id NVARCHAR(255) NULL;
