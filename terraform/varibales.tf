variable "region" {
  default     = "us-east-1"
  type        = string
  description = "Deployment region"
}

variable "environment" {
  default = "dev"
  type    = string
}

variable "ami" {
  default = "ami-0ecb62995f68bb549"
  type    = string
}

variable "instance-type" {
  default = "t2.micro"
  type    = string
}