output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group ids attached to the cluster control plane"
  value       = module.eks.cluster_security_group_id
}

output "region" {
  description = "AWS region"
  value       = var.region
}

output "cluster_name" {
  description = "Kubernetes Cluster Name"
  value       = module.eks.cluster_name
}

output "http_api1_repository" {
  value       = aws_ecr_repository.http_api1_repository.repository_url
  description = "The URL of the ECR repository."
}

output "http_api2_repository" {
  value       = aws_ecr_repository.http_api2_repository.repository_url
  description = "The URL of the ECR repository."
}


output "db_instance_endpoint" {
  value       = aws_db_instance.my_db_instance.endpoint
  description = "The endpoint of the RDS MySQL database."
}

output "db_instance_username" {
  value       = aws_db_instance.my_db_instance.username
  description = "The username for the RDS MySQL database."
}
