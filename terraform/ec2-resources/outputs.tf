output "ec2_public_ip_address" {
  value = aws_instance.focusflare_server.public_ip
}
