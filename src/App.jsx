import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    classeEsqueletica: '',
    padraoFacial: '',
    problemasTransversais: '',
    problemasVerticais: '',
    problemasLinguais: '',
    protrusao: ''
  })
  
  const [resultado, setResultado] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calcularAparelho = () => {
    const { classeEsqueletica, padraoFacial, problemasTransversais, problemasVerticais, problemasLinguais, protrusao } = formData

    // Lógica de decisão baseada nos manuais fornecidos
    
    // 1. PIPS - Prioridade para mordidas cruzadas
    if (problemasTransversais === 'Mordida Cruzada Posterior' || 
        problemasTransversais === 'Mordida Cruzada Anterior' ||
        problemasTransversais === 'Mordida Cruzada Bilateral') {
      return {
        aparelho: 'PIPS',
        nome: 'Pistas Indiretas Planas Simples',
        descricao: 'Aparelho bimaxilar composto por duas partes separadas (superior e inferior) que funcionam por interface de apoio. Ideal para correção de mordidas cruzadas.',
        indicacoes: [
          'Mordidas cruzadas superiores bilaterais ou unilaterais',
          'Pseudo-mesioclusões (Classe I com mordida cruzada anterior)',
          'Correção de posição dentária (retroinclinação, vestibularização)',
          'Conquista de espaços',
          'Estímulo ao crescimento transversal'
        ],
        procedimentos: [
          'Moldagem das arcadas superior e inferior',
          'Registro de mordida com mudança de postura terapêutica',
          'Abertura vertical suficiente para eliminar contatos de cúspides',
          'Pistas superiores 2mm afastadas das faces palatinas dos dentes posteriores',
          'Planejamento de acessórios conforme necessidade do caso'
        ],
        imagem: '/images/pips.jpg'
      }
    }

    // 2. PIPC - Para distoclusões com retrusão mandibular
    if (classeEsqueletica === 'Classe II Divisão 2' || 
        (classeEsqueletica === 'Classe II Divisão 1' && problemasVerticais === 'Mordida Profunda')) {
      if (protrusao === 'Protrusão Livre' || protrusao === '') {
        return {
          aparelho: 'PIPC',
          nome: 'Pistas Indiretas Planas Compostas',
          descricao: 'Dispositivo bimaxilar indicado para distoclusão com retrusão mandibular. Possui arcos dorsais que unem as partes superior e inferior, mantendo a postura mandibular.',
          indicacoes: [
            'Distoclusão',
            'Retrusão mandibular',
            'Mordida profunda',
            'Desenvolvimento transversal superior e inferior',
            'Finalização de tratamentos'
          ],
          procedimentos: [
            'Moldagem das arcadas superior e inferior',
            'Registro de mordida com mudança de postura mandibular',
            'Atenção à cronologia de erupção (não possui apoios oclusais inferiores)',
            'Pode incluir Equiplan para grandes mudanças de postura vertical',
            'Mudança de postura terapêutica nos modelos antes do envio ao laboratório'
          ],
          contraindicacoes: ['Pacientes com protrusão quebrada'],
          imagem: '/images/pipc.jpg'
        }
      }
    }

    // 3. SN2 - Para mesioclusões e problemas linguais
    if (classeEsqueletica === 'Classe III' || 
        problemasVerticais === 'Mordida Aberta' ||
        problemasLinguais === 'Língua Baixa' ||
        problemasLinguais === 'Língua Interposta' ||
        problemasLinguais === 'Língua Espessa') {
      return {
        aparelho: 'SN2',
        nome: 'Simões Network 2',
        descricao: 'Aparelho bioelástico cujo principal mecanismo de ação é através da língua. Possui arco dorsal entrelaçado que envolve a língua, elevando-a e impedindo contato direto com os arcos dentários.',
        indicacoes: [
          'Mordida aberta',
          'Mordida cruzada',
          'Mesiooclusões',
          'Biprotrusões',
          'Mudança da postura lingual',
          'Controle de línguas espessas',
          'Estímulo ao desenvolvimento da maxila'
        ],
        procedimentos: [
          'Moldagem das arcadas',
          'Registro de mordida com mudança de postura terapêutica',
          'Diagnóstico obrigatório da protrusão (livre ou quebrada)',
          'Mudança de postura terapêutica nos modelos antes do envio ao laboratório'
        ],
        contraindicacoes: ['Pacientes com protrusão livre (usar apenas em protrusões quebradas)'],
        imagem: '/images/sn2.webp'
      }
    }

    // 4. SN3 - Para casos diversos com problemas linguais e posturais
    if (problemasLinguais === 'Dorso da Língua Baixo' ||
        problemasLinguais === 'Ponta da Língua Baixa' ||
        problemasLinguais === 'Postura Lingual para Frente' ||
        problemasVerticais === 'Planos Oclusais Divergentes' ||
        (classeEsqueletica === 'Classe II Divisão 1' && padraoFacial === 'Face Longa')) {
      return {
        aparelho: 'SN3',
        nome: 'Simões Network 3',
        descricao: 'Modelo com pequenas aletas de acrílico na parte inferior. Exerce ação mais suave sobre a língua e ancora a mandíbula diretamente através das aletas.',
        indicacoes: [
          'Planos oclusais divergentes',
          'Biprotrusões',
          'Mordida aberta',
          'Tendência a mesioclusão ou distoclusão',
          'Problemas de postura lingual',
          'Ancoragem mandibular em D.A.'
        ],
        procedimentos: [
          'Moldagem das arcadas',
          'Registro de mordida com mudança de postura terapêutica',
          'Para casos de dificuldade de manutenção da postura, pode-se aumentar as aletas inferiores',
          'Possibilidade de adicionar arco de Hawley para reforço',
          'Mudança de postura terapêutica nos modelos antes do envio ao laboratório'
        ],
        imagem: '/images/sn3.jpg'
      }
    }

    // 5. SN1 - Para neutroclusões e distoclusões sem complicações
    if (classeEsqueletica === 'Classe I' || 
        (classeEsqueletica === 'Classe II Divisão 1' && padraoFacial === 'Face Equilibrada' && problemasVerticais === 'Sem Problemas Verticais')) {
      return {
        aparelho: 'SN1',
        nome: 'Simões Network 1',
        descricao: 'Aparelho leve com sistema deslizante suave. Estimula a mandíbula à posição funcional sem exercer força sobre os dentes. Não possui pistas, escudos ou gravatas.',
        indicacoes: [
          'Neutroclusões',
          'Distoclusões',
          'Manutenção do contato incisivo em D.A.',
          'Bocas pequenas (preserva espaço oral)',
          'Ancoragem da postura em pró-translação',
          'Não interfere na erupção dentária'
        ],
        procedimentos: [
          'Moldagem das arcadas',
          'Registro de mordida com mudança de postura terapêutica',
          'Pode ser associado ao Equiplan',
          'Possibilidade de adicionar acessórios na parte inferior',
          'Mudança de postura terapêutica nos modelos antes do envio ao laboratório'
        ],
        contraindicacoes: ['Nunca indicado para mesioclusões'],
        imagem: '/images/sn1.jpg'
      }
    }

    // Caso padrão - se não se encaixar em nenhuma categoria específica
    return {
      aparelho: 'SN1',
      nome: 'Simões Network 1',
      descricao: 'Aparelho versátil indicado como opção padrão para casos que não se encaixam em categorias específicas.',
      indicacoes: ['Casos gerais de neutroclusão e distoclusão'],
      procedimentos: ['Moldagem e registro de mordida padrão'],
      imagem: '/images/sn1.jpg'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const resultado = calcularAparelho()
    setResultado(resultado)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Guia de Seleção de Aparelhos OFM
          </h1>
          <p className="text-lg text-gray-600">
            Ferramenta para auxiliar na seleção do aparelho de Ortopedia Funcional dos Maxilares mais adequado
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classe Esquelética
                </label>
                <select
                  value={formData.classeEsqueletica}
                  onChange={(e) => handleInputChange('classeEsqueletica', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Classe I">Classe I</option>
                  <option value="Classe II Divisão 1">Classe II Divisão 1</option>
                  <option value="Classe II Divisão 2">Classe II Divisão 2</option>
                  <option value="Classe III">Classe III</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Padrão Facial
                </label>
                <select
                  value={formData.padraoFacial}
                  onChange={(e) => handleInputChange('padraoFacial', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Face Equilibrada">Face Equilibrada</option>
                  <option value="Face Longa">Face Longa</option>
                  <option value="Face Curta">Face Curta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problemas Transversais
                </label>
                <select
                  value={formData.problemasTransversais}
                  onChange={(e) => handleInputChange('problemasTransversais', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Sem Mordida Cruzada">Sem Mordida Cruzada</option>
                  <option value="Mordida Cruzada Posterior">Mordida Cruzada Posterior</option>
                  <option value="Mordida Cruzada Anterior">Mordida Cruzada Anterior</option>
                  <option value="Mordida Cruzada Bilateral">Mordida Cruzada Bilateral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problemas Verticais
                </label>
                <select
                  value={formData.problemasVerticais}
                  onChange={(e) => handleInputChange('problemasVerticais', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Sem Problemas Verticais">Sem Problemas Verticais</option>
                  <option value="Mordida Aberta">Mordida Aberta</option>
                  <option value="Mordida Profunda">Mordida Profunda</option>
                  <option value="Planos Oclusais Divergentes">Planos Oclusais Divergentes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problemas Linguais
                </label>
                <select
                  value={formData.problemasLinguais}
                  onChange={(e) => handleInputChange('problemasLinguais', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Sem Problemas Linguais">Sem Problemas Linguais</option>
                  <option value="Língua Baixa">Língua Baixa</option>
                  <option value="Língua Interposta">Língua Interposta</option>
                  <option value="Língua Espessa">Língua Espessa</option>
                  <option value="Dorso da Língua Baixo">Dorso da Língua Baixo</option>
                  <option value="Ponta da Língua Baixa">Ponta da Língua Baixa</option>
                  <option value="Postura Lingual para Frente">Postura Lingual para Frente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Protrusão
                </label>
                <select
                  value={formData.protrusao}
                  onChange={(e) => handleInputChange('protrusao', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Protrusão Livre">Protrusão Livre</option>
                  <option value="Protrusão Quebrada">Protrusão Quebrada</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Calcular Aparelho Recomendado
              </button>
            </div>
          </form>
        </div>

        {resultado && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                Aparelho Recomendado: {resultado.aparelho}
              </h2>
              <h3 className="text-xl text-gray-700">{resultado.nome}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={resultado.imagem}
                  alt={resultado.aparelho}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Descrição</h4>
                <p className="text-gray-600 mb-4">{resultado.descricao}</p>

                <h4 className="text-lg font-semibold text-gray-800 mb-3">Indicações</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  {resultado.indicacoes.map((indicacao, index) => (
                    <li key={index}>{indicacao}</li>
                  ))}
                </ul>

                {resultado.contraindicacoes && (
                  <>
                    <h4 className="text-lg font-semibold text-red-600 mb-3">Contraindicações</h4>
                    <ul className="list-disc list-inside text-red-600 space-y-1 mb-4">
                      {resultado.contraindicacoes.map((contraindicacao, index) => (
                        <li key={index}>{contraindicacao}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Procedimentos Clínicos Pré-Laboratório</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {resultado.procedimentos.map((procedimento, index) => (
                    <li key={index}>{procedimento}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> A mudança de postura terapêutica deve ser realizada pelo profissional nos modelos antes de enviar ao protético. Este é um passo fundamental para o sucesso do tratamento.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumo da Lógica de Decisão</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-red-50 rounded">
              <strong className="text-red-700">PIPS:</strong> Prioridade para mordidas cruzadas (posterior, anterior, bilateral)
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <strong className="text-blue-700">PIPC:</strong> Classe II Div 2 ou Classe II Div 1 com mordida profunda (protrusão livre)
            </div>
            <div className="p-3 bg-green-50 rounded">
              <strong className="text-green-700">SN2:</strong> Classe III, mordida aberta, problemas linguais
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <strong className="text-purple-700">SN3:</strong> Problemas linguais específicos, face longa
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <strong className="text-gray-700">SN1:</strong> Classe I, Classe II Div 1 sem complicações
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

