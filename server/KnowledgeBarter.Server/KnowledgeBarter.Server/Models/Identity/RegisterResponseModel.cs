﻿namespace KnowledgeBarter.Server.Models.Identity
{
    public class RegisterResponseModel
    {
        public string AccessToken { get; set; } = null!;

        public string _id { get; set; } = null!;

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int KBPoints { get; set; }
    }
}
