using System;
using System.Text.Json;
using System.Threading;
using Azure.Storage.Blobs;
using Azure.Storage.Queues;
using Azure.Storage.Queues.Models;

class Program
{
    static void Main()
    {
        CheckAzurite();

        ProcessQueue();
    }

    static void CheckAzurite()
    {
        string connectionString = "UseDevelopmentStorage=true"; 

        var blobServiceClient = new BlobServiceClient(connectionString);
        Console.WriteLine("Containers:");
        foreach (var container in blobServiceClient.GetBlobContainers())
        {
            Console.WriteLine($"- {container.Name}");
        }

        var queueClient = new QueueClient(connectionString, "pics-to-delete");
        queueClient.CreateIfNotExists();

        if (queueClient.Exists())
            Console.WriteLine("The queue pics-to-delete exists ✅");
        else
            Console.WriteLine("The queue pics-to-delete DO NOT exist ❌");
    }

    static void ProcessQueue()
    {
        string connectionString = "UseDevelopmentStorage=true"; 
        var queueClient = new QueueClient(connectionString, "pics-to-delete");
        queueClient.CreateIfNotExists();

        var blobClient = new BlobServiceClient(connectionString);

        while (true)
        {
            QueueMessage message = queueClient.ReceiveMessage();
            if (message != null)
            {
                var task = JsonSerializer.Deserialize<DeleteTask>(message.Body);

                DeleteAlterEgoImage(blobClient, task);
                DeleteHeroImage(blobClient, task);

                queueClient.DeleteMessage(message.MessageId, message.PopReceipt);
            }
            else
            {
                Console.WriteLine("No messages, waiting 5 seconds...");
                Thread.Sleep(5000);
            }
        }
    }

    static void DeleteAlterEgoImage(BlobServiceClient blobClient, DeleteTask task)
    {
        var container = blobClient.GetBlobContainerClient("alteregos");
        var fileName = $"{task.alterEgoName.Replace(' ', '-').ToLower()}.png";
        var blob = container.GetBlobClient(fileName);

        if (blob.Exists())
        {
            Console.WriteLine($"Deleting alter ego image: {fileName}");
            blob.DeleteIfExists();
        }
        else
        {
            Console.WriteLine($"No alter ego image to delete for {task.alterEgoName}");
        }
    }

    static void DeleteHeroImage(BlobServiceClient blobClient, DeleteTask task)
    {
        var container = blobClient.GetBlobContainerClient("heroes");
        string[] extensions = { "jpg", "jpeg" };
        foreach (var ext in extensions)
        {
            var fileName = $"{task.heroName.Replace(' ', '-').ToLower()}.{ext}";
            var blob = container.GetBlobClient(fileName);
            if (blob.Exists())
            {
                Console.WriteLine($"Deleting hero image: {fileName}");
                blob.DeleteIfExists();
                return;
            }
        }
        Console.WriteLine($"No hero image to delete for {task.heroName}");
    }
}

class DeleteTask
{
    public string heroName { get; set; }
    public string alterEgoName { get; set; }
}
