namespace ML
{
    using Microsoft.ML;
    using System.Net;

    public class ReviewPredictionModel
    {
        private static Lazy<PredictionEngine<ModelInput, ModelOutput>> PredictionEngine = new Lazy<PredictionEngine<ModelInput, ModelOutput>>(CreatePredictionEngine);

        public static ModelOutput Predict(ModelInput input)
        {
            ModelOutput result = PredictionEngine.Value.Predict(input);
            return result;
        }

        public static PredictionEngine<ModelInput, ModelOutput> CreatePredictionEngine()
        {
            MLContext mlContext = new MLContext();

            //string modelPath = @"C:\Users\radit\AppData\Local\Temp\MLVSTools\AutoMlTestML\AutoMlTestML.Model\MLModel.zip";
            if (!File.Exists("MLModel.zip"))
            {
                using (var client = new WebClient())
                {
                    client.DownloadFile("https://firebasestorage.googleapis.com/v0/b/knowledge-barter.appspot.com/o/MLModel.zip?alt=media&token=eff55593-acdd-41ca-9027-90089ea23b9c", "MLModel.zip");
                }
            }

            ITransformer mlModel = mlContext.Model.Load("MLModel.zip", out var modelInputSchema);
            var predEngine = mlContext.Model.CreatePredictionEngine<ModelInput, ModelOutput>(mlModel);

            return predEngine;
        }
    }
}
