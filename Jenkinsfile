pipeline {
  agent any

  environment {
    IMAGE_NAME = 'rishabhraj7/todo-app'
    DOCKER_CREDENTIALS_ID = 'docker-hub-creds'
    AZURE_SP_CREDENTIALS_ID = 'azure-service-principal'
    RESOURCE_GROUP = 'todo-app-rg'
    CLUSTER_NAME = 'todo-aks-cluster'
    K8S_NAMESPACE = 'default'
    DEPLOYMENT_YAML = 'k8s/deployment.yaml'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/rishabh-raj-777/mern-blog-app.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        dir('app') {
          sh 'npm install'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
            def app = docker.build("${IMAGE_NAME}:${BUILD_NUMBER}", './app')
            app.push()
          }
        }
      }
    }

    stage('Login to Azure') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: AZURE_SP_CREDENTIALS_ID,
          usernameVariable: 'AZURE_CLIENT_ID',
          passwordVariable: 'AZURE_CLIENT_SECRET'
        )]) {
          sh '''
            az login --service-principal \
              --username $AZURE_CLIENT_ID \
              --password $AZURE_CLIENT_SECRET \
              --tenant azurekmlprodkodekloud.onmicrosoft.com

            az aks get-credentials --resource-group ${RESOURCE_GROUP} --name ${CLUSTER_NAME}
          '''
        }
      }
    }

    stage('Deploy to AKS') {
      steps {
        sh 'kubectl apply -f ${DEPLOYMENT_YAML} --namespace=${K8S_NAMESPACE}'
      }
    }

    stage('Deployment Result') {
      steps {
        script {
          def status = sh(script: "kubectl rollout status deployment/todo-app-deployment --namespace=${K8S_NAMESPACE}", returnStatus: true)
          if (status == 0) {
            echo '✅ Deployment successful!'
          } else {
            error '❌ Deployment failed!'
          }
        }
      }
    }
  }
}
