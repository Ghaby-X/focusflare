output "vpc_id" {
  value = aws_default_vpc.default_vpc.id
}

output "public_subnet_id" {
  value = aws_default_subnet.default_subnet.id
}
