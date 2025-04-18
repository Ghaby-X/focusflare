terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {
    bucket = "tfstate213442"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}


module "network-resources" {
  source = "./network-resources"
}

module "security-resources" {
  source = "./security-resources"
  vpc_id = module.network-resources.vpc_id
}


module "ec2-resources" {
  source            = "./ec2-resources"
  vpc_id            = module.network-resources.vpc_id
  security_group_id = module.security-resources.security_group_id
  public_subnet_id  = module.network-resources.public_subnet_id
}
