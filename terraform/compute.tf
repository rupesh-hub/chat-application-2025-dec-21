resource "aws_instance" "compute" {
  ami             = var.ami
  instance_type   = var.instance-type
  key_name        = aws_key_pair.key-pair.key_name
  security_groups = [aws_security_group.custom-sg.name]

  tags = {
    Name        = "compute"
    Environment = var.environment
  }
}