pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        PROJECT_DIR = "${WORKSPACE}"
        COMPOSE_FILE = "docker-compose.prod.yml"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node modules') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Docker Compose Down') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh "docker-compose -f ${COMPOSE_FILE} down || true"
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh "docker-compose -f ${COMPOSE_FILE} up -d --build"
                }
            }
        }
    }

    post {
        always {
            echo "Build finished"
        }
    }
}