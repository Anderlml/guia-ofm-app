import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Stethoscope, Brain, Zap, CheckCircle } from 'lucide-react'
import './App.css'

function App() {
  const [classeEsqueletica, setClasseEsqueletica] = useState('')
  const [padraoFacial, setPadraoFacial] = useState('')
  const [problemasTransversais, setProblemasTransversais] = useState('')
  const [problemasVerticais, setProblemasVerticais] = useState('')
  const [resultado, setResultado] = useState('')

  const getRecommendedAppliance = (classe, padrao, transversal, vertical) => {
    if (transversal.includes('Mordida Cruzada Posterior')) {
      return 'PIPS'
    }
    if (classe === 'Classe II Divisão 2') {
      return 'PIPC'
    }
    if (classe === 'Classe III') {
      return 'SN2'
    }
    if (classe === 'Classe II Divisão 1') {
      if (vertical === 'Mordida Aberta Anterior' || padrao === 'Face Longa') {
        return 'SN3'
      }
      if (padrao === 'Padrão Neutro' || padrao === 'Face Curta') {
        return 'SN1'
      }
    }
    if (vertical === 'Sobremordida Profunda') {
      return 'PIPC'
    }
    
    return 'Nenhum Aparelho Específico / Avaliar'
  }

  const handleCalculate = () => {
    const aparelho = getRecommendedAppliance(classeEsqueletica, padraoFacial, problemasTransversais, problemasVerticais)
    setResultado(aparelho)
  }

  const getApplianceDescription = (aparelho) => {
    const descriptions = {
      'PIPS': {
        name: 'PIPS (Pistas Simples)',
        description: 'Indicado para correção de mordida cruzada posterior. As pistas promovem a lateroprotrusão da mandíbula, estimulando a correção da mordida cruzada de forma funcional.',
        color: 'bg-blue-100 text-blue-800'
      },
      'PIPC': {
        name: 'PIPC (Pistas Compostas)',
        description: 'Ideal para Classe II Divisão 2 e sobremordida profunda. Ajuda a descruzar a mordida anterior e estimular o crescimento mandibular.',
        color: 'bg-green-100 text-green-800'
      },
      'SN1': {
        name: 'SN1 (Snorex 1)',
        description: 'Recomendado para Classe II Divisão 1 com bom selamento labial e padrão facial neutro ou face curta. Favorece a extrusão posterior e o aumento da dimensão vertical.',
        color: 'bg-purple-100 text-purple-800'
      },
      'SN2': {
        name: 'SN2 (Snorex 2)',
        description: 'Específico para Classe III. Visa estimular o crescimento maxilar e/ou restringir o crescimento mandibular.',
        color: 'bg-orange-100 text-orange-800'
      },
      'SN3': {
        name: 'SN3 (Snorex 3)',
        description: 'Indicado para Classe II Divisão 1 com necessidade de controle vertical ou mordida aberta anterior. Ideal para pacientes com padrão de face longa.',
        color: 'bg-red-100 text-red-800'
      }
    }
    
    return descriptions[aparelho] || {
      name: aparelho,
      description: 'Consulte um especialista para avaliação mais detalhada.',
      color: 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Guia de Seleção de Aparelhos OFM</h1>
          </div>
          <p className="text-lg text-gray-600">Ortopedia Funcional dos Maxilares - Ferramenta de Apoio à Decisão Clínica</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                Características do Paciente
              </CardTitle>
              <CardDescription>
                Selecione as características clínicas observadas no paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Classe Esquelética</label>
                <Select value={classeEsqueletica} onValueChange={setClasseEsqueletica}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a classe esquelética" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Classe II Divisão 1">Classe II Divisão 1</SelectItem>
                    <SelectItem value="Classe II Divisão 2">Classe II Divisão 2</SelectItem>
                    <SelectItem value="Classe III">Classe III</SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Padrão Facial</label>
                <Select value={padraoFacial} onValueChange={setPadraoFacial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o padrão facial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Face Longa">Face Longa</SelectItem>
                    <SelectItem value="Face Curta">Face Curta</SelectItem>
                    <SelectItem value="Padrão Neutro">Padrão Neutro</SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Problemas Transversais</label>
                <Select value={problemasTransversais} onValueChange={setProblemasTransversais}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione problemas transversais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mordida Cruzada Posterior (Unilateral)">Mordida Cruzada Posterior (Unilateral)</SelectItem>
                    <SelectItem value="Mordida Cruzada Posterior (Bilateral)">Mordida Cruzada Posterior (Bilateral)</SelectItem>
                    <SelectItem value="Sem Mordida Cruzada">Sem Mordida Cruzada</SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Problemas Verticais</label>
                <Select value={problemasVerticais} onValueChange={setProblemasVerticais}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione problemas verticais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mordida Aberta Anterior">Mordida Aberta Anterior</SelectItem>
                    <SelectItem value="Sobremordida Profunda">Sobremordida Profunda</SelectItem>
                    <SelectItem value="Sem Problemas Verticais">Sem Problemas Verticais</SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleCalculate} 
                className="w-full mt-6"
                disabled={!classeEsqueletica && !padraoFacial && !problemasTransversais && !problemasVerticais}
              >
                <Zap className="h-4 w-4 mr-2" />
                Calcular Aparelho Recomendado
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Resultado da Análise
              </CardTitle>
              <CardDescription>
                Aparelho recomendado com base nas características selecionadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resultado ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${getApplianceDescription(resultado).color}`}>
                      {getApplianceDescription(resultado).name}
                    </Badge>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Descrição e Indicações:</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {getApplianceDescription(resultado).description}
                    </p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Importante:</strong> Este guia é uma ferramenta de apoio e não substitui a avaliação clínica do profissional. 
                      Em casos complexos, mais de um aparelho pode ser indicado ou uma sequência de aparelhos.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <Stethoscope className="h-16 w-16 mx-auto" />
                  </div>
                  <p className="text-gray-500">
                    Selecione as características do paciente e clique em "Calcular" para ver a recomendação.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle>Lógica de Decisão - Aparelhos OFM</CardTitle>
            <CardDescription>
              Resumo das indicações principais para cada aparelho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'PIPS (Pistas Simples)',
                  priority: 'Mordida Cruzada Posterior',
                  color: 'bg-blue-100 text-blue-800'
                },
                {
                  name: 'PIPC (Pistas Compostas)',
                  priority: 'Classe II Divisão 2 / Sobremordida Profunda',
                  color: 'bg-green-100 text-green-800'
                },
                {
                  name: 'SN1 (Snorex 1)',
                  priority: 'Classe II Divisão 1 / Face Curta ou Neutra',
                  color: 'bg-purple-100 text-purple-800'
                },
                {
                  name: 'SN2 (Snorex 2)',
                  priority: 'Classe III',
                  color: 'bg-orange-100 text-orange-800'
                },
                {
                  name: 'SN3 (Snorex 3)',
                  priority: 'Classe II Divisão 1 / Face Longa / Mordida Aberta',
                  color: 'bg-red-100 text-red-800'
                }
              ].map((aparelho, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <Badge className={`mb-2 ${aparelho.color}`}>
                    {aparelho.name}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {aparelho.priority}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

