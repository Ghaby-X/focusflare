resource "aws_default_vpc" "default_vpc" {
  force_destroy = false
}

resource "aws_default_subnet" "default_subnet" {
  availability_zone = "us-east-1a"
  force_destroy     = false
}
