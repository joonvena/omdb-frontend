terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.region
}

# Configure bucket for website hosting
resource "aws_s3_bucket" "site_bucket" {
    bucket = var.bucket_name
    acl = "public-read"

    website {
        index_document = "index.html"
        error_document = "error.html"
    }
}

# Define policy to give public access to bucket
resource "aws_s3_bucket_policy" "site_bucket" {
    bucket = aws_s3_bucket.site_bucket.id

    policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${var.bucket_name}/*"
            ]
        }
    ]
}
POLICY
}

output "bucket_url" {
    value = aws_s3_bucket.site_bucket.website_endpoint
}