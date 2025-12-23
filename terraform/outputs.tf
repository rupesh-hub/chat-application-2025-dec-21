output "instance-public-ip" {
  value = aws_instance.compute.public_ip
}

output "instance-public-dns" {
  value = aws_instance.compute.public_dns
}