document.addEventListener('DOMContentLoaded', (event) => {
    const questions = [
        "Quando você está se sentindo para baixo, o que mais ajuda a levantar seu ânimo?",
        "O que faz você se sentir mais valorizado em um relacionamento?",
        "Em um aniversário ou data comemorativa, o que você mais apreciaria?",
        "O que mais te faz sentir amado(a) após um dia longo e estressante?",
        "Quando você pensa em gestos românticos, qual das seguintes opções te atrai mais?",
        "O que te faz sentir mais próximo(a) de alguém?",
        "Como você prefere comemorar uma conquista pessoal?",
        "O que mais te machuca em um relacionamento?",
        "O que te faz sentir mais apreciado(a)?",
        "Em um relacionamento, o que te faz sentir mais conectado(a)?",
        "O que mais te emociona?",
        "Como você prefere passar um sábado à noite?",
        "O que te faz sentir mais cuidado(a) e amado(a)?",
        "O que mais te faz sentir especial?",
        "O que te faz sentir mais próximo(a) e conectado(a) em um relacionamento?"
    ];

    const optionsA = [
        "Um abraço ou carinho.",
        "Receber um presente inesperado.",
        "Passar um tempo de qualidade juntos.",
        "Conversar e compartilhar seus sentimentos.",
        "Uma carta ou mensagem carinhosa.",
        "Quando essa pessoa dedica tempo para ouvir você.",
        "Com palavras de reconhecimento e elogio.",
        "Sentir-se negligenciado(a) ou não ter tempo de qualidade juntos.",
        "Quando alguém te dá um presente.",
        "Conversas profundas e significativas.",
        "Ouvir palavras sinceras de amor.",
        "Fazendo algo juntos, como cozinhar ou assistir a um filme.",
        "Quando alguém te elogia ou reconhece seus esforços.",
        "Quando alguém faz algo por você, sem você pedir.",
        "Conversas longas e sem interrupções."
    ];

    const optionsB = [
        "Alguém fazendo algo especial para você.",
        "Ouvir palavras encorajadoras.",
        "Receber um presente pensativo.",
        "Um simples toque ou abraço.",
        "Seu parceiro fazendo uma tarefa por você.",
        "Quando ela te dá um presente, mesmo que simples.",
        "Com um toque afetuoso, como um abraço.",
        "Não receber palavras de afirmação ou elogio.",
        "Quando alguém faz algo por você, como uma surpresa.",
        "Gestos físicos de carinho.",
        "Receber um presente que mostra que a pessoa pensou em você.",
        "Recebendo ou dando uma massagem.",
        "Quando alguém dedica tempo para estar com você.",
        "Quando você recebe um presente, mesmo que pequeno.",
        "Abraços, beijos e carinhos."
    ];

    const scoresA = [
        "Toque Físico",
        "Recebimento de Presentes",
        "Tempo de Qualidade",
        "Tempo de Qualidade",
        "Palavras de Afirmação",
        "Tempo de Qualidade",
        "Palavras de Afirmação",
        "Tempo de Qualidade",
        "Recebimento de Presentes",
        "Tempo de Qualidade",
        "Palavras de Afirmação",
        "Tempo de Qualidade",
        "Palavras de Afirmação",
        "Atos de Serviço",
        "Tempo de Qualidade"
    ];

    const scoresB = [
        "Atos de Serviço",
        "Palavras de Afirmação",
        "Recebimento de Presentes",
        "Toque Físico",
        "Atos de Serviço",
        "Recebimento de Presentes",
        "Toque Físico",
        "Palavras de Afirmação",
        "Atos de Serviço",
        "Toque Físico",
        "Recebimento de Presentes",
        "Toque Físico",
        "Tempo de Qualidade",
        "Recebimento de Presentes",
        "Toque Físico"
    ];

    const questionContainer = document.getElementById('questionContainer');
    const resultContainer = document.getElementById('resultContainer');
    const questionText = document.getElementById('questionText');
    const answerSlider = document.getElementById('answerSlider');
    const nextButton = document.getElementById('nextButton');
    const refreshPage = document.getElementById('refreshPage');
    const optionALabel = document.getElementById('optionALabel');
    const optionBLabel = document.getElementById('optionBLabel');

    let currentQuestionIndex = 0;
    let scores = {
        "Palavras de Afirmação": 0,
        "Atos de Serviço": 0,
        "Recebimento de Presentes": 0,
        "Tempo de Qualidade": 0,
        "Toque Físico": 0
    };

    questionText.textContent = questions[currentQuestionIndex];
    optionALabel.textContent = optionsA[currentQuestionIndex];
    optionBLabel.textContent = optionsB[currentQuestionIndex];

    refreshPage.addEventListener('click', function() {
        location.reload()
    });

    nextButton.addEventListener('click', function() {

        // Lógica para atualizar os scores com base na resposta
        let sliderValue = parseInt(answerSlider.value, 10);

        if (sliderValue < 0) {
            scores[scoresA[currentQuestionIndex]] += Math.abs(sliderValue);
        } else {
            scores[scoresB[currentQuestionIndex]] += sliderValue;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            optionALabel.textContent = optionsA[currentQuestionIndex];
            optionBLabel.textContent = optionsB[currentQuestionIndex];
            questionText.textContent = questions[currentQuestionIndex];
            answerSlider.value = 0; // Reset para o meio
        } else {
            questionContainer.style.display = 'none';
            resultContainer.style.display = 'block';

            // Converte em percentuais
            let totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
            for (let language in scores) {
                scores[language] = Math.round((scores[language] / totalPoints) * 100);
            }
            // Chama a função principal
            createRadarChart(scores);
        }
    });

    function createRadarChart(scores) {
        const ctx = document.getElementById('loveLanguagesChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: Object.keys(scores),
                datasets: [{
                    label: 'Sua Linguagem do Amor',
                    data: Object.values(scores),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
});