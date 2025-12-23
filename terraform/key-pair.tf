resource "aws_key_pair" "key-pair" {
  public_key = file("/Users/rupeshdulal/Desktop/DEVOPS-FULL-COURSE/KUBERNETES-HANDSON/CHAT-APPLICATION/terraform/terra-key.pub")
  key_name   = "terra-key"
  tags = {
    Name        = "key-pair"
    Environment = var.environment
  }
}