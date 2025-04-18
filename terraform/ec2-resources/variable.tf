variable "ami_id" {
  # ubuntu ami 64-bit (x86) us-east-1
  default = "ami-0453ec754f44f9a4a"
}

variable "instance_type" {
  default = "t2.micro"
}
variable "vpc_id" {
  type = string
}
variable "security_group_id" {
  type = string
}
variable "public_subnet_id" {
  type = string
}

variable "docker-repo" {
  default = "ghaby/projects"
  type    = string
}

variable "ssh_public_key" {
  default = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDIkTc/65+mOsF35IGrHiPuXDgIZYOrzDp4kClWZzYlzkWTX3wiqEtftf/xhM4v5RJyWNOpqDZR7fzNs3uGW367oP1yPAsT8yt5uHlBPav/GOCqQ2kNf9oOW/7UzPii0OeKdYHMzHsghxcDZ1QJvvRMjHMEJeICtLL2FPTfykQ1/fVF9cpiAuPjO4YizGAp4eWn15BoETIIiquiErHYLASvmbjcF+wtA8zv2Hc0yYCQGzZrZqKearkw5L+krU8O8S9r2e8W6TR++mgNTBjj2P/7Ob0/O2itHa5YL85LH1KQyhESDyGZe9GMsyqCafR0sS/s+mdcKzQ5UfzvsOBLYYzSf8LExLceW5934VZki0GFD4MuL42H/d26V6uFZyZtf4MNMOGtDbPvrLWQoHTuHbQdlBCCjqqYGIVWPRFmvxAaLRethOa5IO6CnTwNqYG8aVe7eto7GexRFSwGFdpvOtFIunNEST6jfpnWD8AXC2VP6YpkzEL1nvImgLhQIfQ+9Sc= gabby@gabby"
  type    = string
}
