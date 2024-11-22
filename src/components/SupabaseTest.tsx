import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Testando conexão...');
  const [testResults, setTestResults] = useState<{table: string, status: string}[]>([]);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setStatus('loading');
      setMessage('Testando conexão com Supabase...');

      const tables = ['profiles', 'events', 'tickets', 'categories', 'coupons'];
      const results = [];

      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('id')
            .limit(1);

          results.push({
            table,
            status: error ? `Erro: ${error.message}` : 'OK'
          });
        } catch (err: any) {
          results.push({
            table,
            status: `Erro: ${err.message}`
          });
        }
      }

      setTestResults(results);

      const hasErrors = results.some(r => r.status.startsWith('Erro'));
      if (hasErrors) {
        setStatus('error');
        setMessage('Alguns testes falharam. Verifique os resultados abaixo.');
      } else {
        setStatus('success');
        setMessage('Conexão estabelecida com sucesso!');
      }
    } catch (error: any) {
      console.error('Erro no teste de conexão:', error);
      setStatus('error');
      setMessage(`Falha na conexão: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Teste de Conexão Supabase</h2>
        
        <div className={`p-4 rounded-lg mb-6 ${
          status === 'loading' ? 'bg-blue-100 text-blue-700' :
          status === 'success' ? 'bg-green-100 text-green-700' :
          'bg-red-100 text-red-700'
        }`}>
          <div className="flex items-center">
            {status === 'loading' && (
              <div className="mr-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
              </div>
            )}
            <p className="font-medium">{message}</p>
          </div>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Resultados por Tabela:</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {testResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-700">{result.table}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    result.status === 'OK' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={testConnection}
          className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Testar Novamente
        </button>
      </div>
    </div>
  );
}