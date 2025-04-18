resource "aws_instance" "focusflare_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  vpc_security_group_ids = [var.security_group_id]
  subnet_id              = var.public_subnet_id
  key_name               = aws_key_pair.public_key.key_name
  user_data              = <<-EOF
  #!/bin/bash
  
  # Add Docker's official GPG key:
  sudo yum update -y

  sudo yum install -y docker
  sudo systemctl enable docker
  sudo systemctl start docker

  sudo docker pull ghaby/projects:latest
  sudo docker run -p 80:80 ${var.docker-repo}
  
  EOF

  tags = {
    Name = "focusflare_server"
  }
}

resource "aws_key_pair" "public_key" {
  key_name   = "public_key"
  public_key = var.ssh_public_key
}


