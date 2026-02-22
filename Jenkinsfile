pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('check out') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'node -v'
                    sh 'npm install'
                }
            }
        }
        stage('Run Backend (Test)') {
            steps {
                dir('backend') {
                    sh 'nohup node server.js > output.log 2>&1 &'
                    echo "Backend starting..."
                    sh 'sleep 5' // wait 5s
                }
            }
        }
        stage('Verify Health') {
            steps {
                sh 'curl http://localhost:3000/api/users || echo " continue pipelines"'
            }
        }
    }
}