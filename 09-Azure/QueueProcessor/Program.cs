using System;
using System.Threading.Tasks;
using Azure.Storage.Queues;
using Azure.Storage.Queues.Models;

class Program
{
    static async Task Main(string[] args)
    {
        string connectionString = "UseDevelopmentStorage=true"; 
        string queueName = "alteregos";

        QueueClient queueClient = new QueueClient(connectionString, queueName);

        await queueClient.CreateIfNotExistsAsync();
        Console.WriteLine($"Queue '{queueName}' ready to get used.");

        QueueMessage[] messages = await queueClient.ReceiveMessagesAsync(maxMessages: 5);

        if (messages.Length == 0)
        {
            Console.WriteLine("There are no messages in queue.");
        }
        else
        {
            foreach (QueueMessage msg in messages)
            {
                Console.WriteLine($"Received messages: {msg.MessageText}");
                Console.WriteLine($"Id: {msg.MessageId}, PopReceipt: {msg.PopReceipt}");

                await queueClient.DeleteMessageAsync(msg.MessageId, msg.PopReceipt);
                Console.WriteLine("Deleted message.");
            }
        }
    }
}


