﻿namespace KnowledgeBarter.Server.Models.Identity
{
    public class LoginResponseModel
    {
        public string AccessToken { get; set; } = null!;

        public string _Id { get; set; } = null!;

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int KBPoints { get; set; }
    }
}
