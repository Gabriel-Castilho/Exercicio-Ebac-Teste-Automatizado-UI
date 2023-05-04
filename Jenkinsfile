pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'master', url: 'https://github.com/Gabriel-Castilho/Ebac_Modulo_13-e-14'
            }
        }
        stage('Instalar dependencias') {
            steps {
               bat 'npm install -y'
            }
        }
        stage('Executar testes de api') {
            steps {
              bat 'npm run cy:run'
            }
        }
    }
}