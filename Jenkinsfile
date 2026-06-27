pipeline {
    agent any

    environment {
        IMAGE_NAME = "saishanker/flask-app"
        EC2_IP = "16.171.13.37"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME:$BUILD_ID ."
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-token-latest', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Push Image') {
            steps {
                sh "docker push $IMAGE_NAME:$BUILD_ID"
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh """
                ssh -i /var/lib/jenkins/.ssh/kubernetes_practice -o StrictHostKeyChecking=no ec2-user@$EC2_IP '
                docker pull $IMAGE_NAME:$BUILD_ID &&
                docker rm -f flask-app || true &&
                docker run -d -p 80:3000 --name flask-app $IMAGE_NAME:$BUILD_ID
                '
                """
            }
        }
    }
}
